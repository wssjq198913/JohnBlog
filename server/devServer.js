import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './apiRoutes';
import Express from 'express';
import logger from 'morgan';
import ejs from 'ejs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../src/containers';


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

app.use((req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    app.locals.queryString = {};
  }
  for (let key in req.query) {
    app.locals.queryString[key] = req.query[key];
  }
  next();
});

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  const markup = renderToString(
    <App/>
  );
  console.log(markup);
  res.render('index', { title: `Johnny's blog`, markup: markup });
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