const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/jquery.freezetable.js',

  plugins: [
    new CleanWebpackPlugin(["dist"])    
  ]
};