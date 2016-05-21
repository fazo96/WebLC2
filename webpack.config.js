var config = require('./webpack.config.common.js')
var webpack = require('webpack')

config.plugins = [
  new webpack.optimize.CommonsChunkPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

module.exports = config
