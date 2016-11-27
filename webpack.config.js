const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {join} = require('path');


module.exports = env => ({
  entry: {
    app: join(__dirname, 'src', 'index.js'),
    vendor: ['preact']
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [join(__dirname, 'node_modules')],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: [["transform-react-jsx", {
            "pragma": "h"
          }]]
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
});
