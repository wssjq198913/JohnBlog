import 'babel-polyfill';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './apiRoutes';
import Express from 'express';
import logger from 'morgan';
import ejs from 'ejs';

// enable SSR
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../src/routes';
import createStore from '../src/store/create';

const store = createStore();
const syncHistory = syncHistoryWithStore(createMemoryHistory(), store);
// enable SSR


const app = Express();

let viewPath = path.join(__dirname, '../dist/client');

app.set('views', viewPath);
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.__express);

console.log('>>>MPP process.env.NODE_ENV = ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('../webpack/client.config.js');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(webpackConfig);
}


app.use(Express.static(path.join(__dirname, '../dist/client')));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, idtoken');
  next();
});

if (process.env.NODE_ENV === 'development') {
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
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // console.log(req.url);
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // `RouterContext` is what the `Router` renders. `Router` keeps these
      // `props` in its state as it listens to `browserHistory`. But on the
      // server our app is stateless, so we need to use `match` to
      // get these props before rendering.
      const markup = renderToString(
        <Provider store={store}>
          <RouterContext {...props} history={syncHistory}/>
        </Provider>
      )
      res.render('index', { title: `Johnny's blog`, markup: markup });
    }
  })
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
    message: err.message  });
});

export default app;