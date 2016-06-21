var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'views');

var config = {
  entry: APP_DIR + '/App.jsx', 
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        include: path.join(__dirname, 'node_modules'), // this also includes flexboxgrid
        exclude: /flexboxgrid/, // so we are excluding it
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      }
    ]
  }
};

module.exports = config;