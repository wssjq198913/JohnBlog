var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(__dirname, '../dist/client');
var isDevelopment = process.env.NODE_ENV === 'development';

var plugins = [
  new htmlWebpackPlugin({
    template: '!!raw-loader!./src/index.ejs',
    inject: 'body',
    filename: 'index.ejs',
    alwaysWriteToDisk: true
  }),
  new htmlWebpackHarddiskPlugin(),
  // new CopyWebpackPlugin([
  //   { from: 'static/favicon.ico' },
  // ]),
  new extractTextPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
  }),
  new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDevelopment ? JSON.stringify('development') : JSON.stringify('production')
    },
    __DEVELOPMENT__: isDevelopment
  })
]

if (isDevelopment) {
  plugins = plugins.concat(
    [
      // in development, we need to enable hot-reload
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  );
}
else {
  plugins.push(
    // in production, we need to enable uglify
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = {
  devtool: isDevelopment ? 'inline-source-map' : false,
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-saga', 'lodash', 'react-helmet'],
    main: isDevelopment ? ['./src/index', 'webpack-hot-middleware/client?reload=true'] : ['./src/index']
  },
  output: {
    path: assetsPath,
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDevelopment ? '[id].js' : '[id].[chunkhash:8].js',
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.(png|jpg|jpeg|gif)$/, use: "url-loader?limit=10000" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: true,
              localIdentName: '[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
            'sass-loader'
          ]
        }))
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              config: {
                path: 'postcss.config.js'
              }
            }
          }]
        }))
      }
    ]
  },
  plugins: plugins
};
