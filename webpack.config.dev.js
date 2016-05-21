var config = require('./webpack.config.common.js')
var webpack = require('webpack')

config.devtool = 'inline-source-map'

module.exports = config
