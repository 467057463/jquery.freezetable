const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    "jquery.freezetable" : path.resolve(__dirname, './src/index'),
  },

  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    } 
  },

  module: {
    rules:[
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(["dist"])    
  ]
};