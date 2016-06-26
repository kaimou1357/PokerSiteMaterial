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
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]',
        include: APP_DIR.images
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=26000',
        include: APP_DIR.images
      }
    ]
  }
};

module.exports = config;