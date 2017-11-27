var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');

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
      { test: /\.(png|jpg|jpeg|gif)$/, use: "raw-loader" },
      { test: /\.css$/, use: "raw-loader" },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[hash:base64:8]'
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
      { from: 'ecosystem.json'},
      { from: 'Blogs', to: 'Blogs'}
    ]),
    new extractTextPlugin({
      filename: 'CSSFORSSR'
    }),
  ]
}