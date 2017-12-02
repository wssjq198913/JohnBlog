import 'babel-polyfill';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './apiRoutes';
import Express from 'express';
import logger from 'morgan';
import ejs from 'ejs';
import favicon from 'serve-favicon';

// enable SSR
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { END } from 'redux-saga';
import routes from '../src/routes';
import createStore from '../src/store/create';
import rootSagas from '../src/sagas';

const store = createStore();
// enable SSR

const app = Express();
app.get('*.js', function (req, res, next) {
  res.header('Content-Encoding', 'gzip');
  next();
});
app.use(favicon(path.join(__dirname, __DEVELOPMENT__ ? '../../static/favicon.ico' : 'favicon.ico')))

let viewPath = path.join(__dirname, '../client');

app.set('views', viewPath);
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);

console.log('>>>JohnBlog process.env.NODE_ENV = ', process.env.NODE_ENV);
var options = {
  maxAge: '1d'
}
app.use(Express.static(path.join(__dirname, '../client'), options));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, idtoken');
  next();
});

app.use((req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    app.locals.queryString = {};
  }
  for (let key in req.query) {
    app.locals.queryString[key] = req.query[key];
  }
  next();
});

if (__DEVELOPMENT__) {
  var webpack = require('webpack');
  var webpackConfig = require('../webpack/client.config.js');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    // noInfo: true,
    stats: {
      colors: true
    }
  }));
  // enable hot-reload and state-preserving
  // compilation error display
  app.use(webpackHotMiddleware(compiler));
}

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  console.log(req.url);
  try {
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search)
      } else if (props && props.components) {
        const rootTask = store.runSaga(rootSagas);
        for(let component of props.components){
          if (component.InitialAction) {
            if (component.InitialAction().type === 'LOAD_BLOG_DETAIL') {
              store.dispatch(component.InitialAction(`${props.params.year}/${props.params.month}/${props.params.day}`, props.params.topic));
            }
            store.dispatch(component.InitialAction());
          }
        }
        store.dispatch(END);
        rootTask.done.then(()=>{
          const initialData = store.getState();
          const markup = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );
          res.render('index', { title: `Johnny's blog`, markup: markup, initialData: JSON.stringify(initialData) });
        });
      }
    })
  }
  catch (err) {
    console.log(err);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('not found');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

export default app;