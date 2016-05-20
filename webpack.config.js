var path = require('path')
var webpack = require('webpack')

var config = {
  entry: path.join(__dirname, 'static', 'app.js'),
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modulesDirectories: [
      'node_modules', 'static'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: /node_modules\/lc2\.js|static/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

config.devServer = {
  contentBase: 'dist',
  watch: true,
  progress: true,
  debug: true,
  devtool: 'inline-source-map',
  port: 9090,
  noInfo: true,
  colors: true,
  inline: true
}

module.exports = config
