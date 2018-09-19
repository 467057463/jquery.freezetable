const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'jquery.freezetable.min.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new UglifyJsPlugin(),
    new webpack.BannerPlugin({
      banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    })
  ]
})
