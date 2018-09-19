const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    "jquery.freezetable" : path.resolve(__dirname, './src/jquery.freezetable.js'),
  },

  module: {
    rules:[
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(["dist"])    
  ]
};