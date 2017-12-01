var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: isDevelopment ? './bin/devServer.js' : './bin/server.js'
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  externals: isDevelopment ? [nodeExternals()] : [],
  output: {
    path: path.resolve('./dist/server'),
    filename: 'server.js',
    publicPath: process.env.HOST + ':' + process.env.PORT + '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.(png|jpg|jpeg|gif)$/, use: "url-loader?limit=10000" },
      { test: /\.css$/, use: "style-loader"},
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: true,
              context: '',
              localIdentName: '[hash:base64]'
            }
          },
            'sass-loader'
          ]
        })
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'ecosystem.json' },
      { from: 'Blogs', to: 'Blogs' },
      { from: 'static/favicon.ico', to: 'favicon.ico' }
    ]),
    new extractTextPlugin({
      filename: 'CSSFORSSR'
    }),
    new webpack.DefinePlugin({
      __SERVER__: true,
      __CLIENT__: false
    })
  ]
}