var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './bin/server.js'
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  output: {
    path: path.resolve('./dist/server'),
    filename: 'server.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },

    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'ecosystem.json'}
    ])
  ]
}