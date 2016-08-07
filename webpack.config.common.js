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
      { test: /\.json$/, loader: 'json' },
      { test: /\.md$/, loaders: ['html', 'markdown'] }
    ]
  }
}

config.devServer = {
  contentBase: 'dist',
  watch: true,
  progress: true,
  debug: true,
  port: 9090,
  noInfo: true,
  colors: true,
  inline: true
}

module.exports = config
