#!/usr/bin/env node

let path = require('path')
let fs = require('fs')
let MongoClient = require('mongodb').MongoClient
let webpack = require('webpack')
let webpackConfig = require('./webpack.config.js')

let diet = require('diet')
let dietStatic = require('diet-static')

let dist = './dist/'
let listen = 'http://localhost:8000'
/*
webpack(webpackConfig, (err, result) => {
  if (err) {
    console.log('Webpack error:', err)
  } else {
    console.log('Webpack done!')
  }
})
*/
let index
fs.readFile(path.resolve(dist, 'index.html'), (err, data) => {
  if (err) {
    console.log('Error while reading index.html:', err)
  } else {
    console.log('index ready.')
    index = data.toString('utf-8')
  }
})
let sendIndex = $ => {
  $.header('content-type', 'text/html')
  $.send(index)
  $.end()
}

let url = 'mongodb://localhost:27017/weblc2'
MongoClient.connect(url, function (err, db) {
  if (err) return console.log(err)
  let programs = db.collection('programs')

  app.post('/program', $ => {
    programs.insert($.body, (err, result) => {
      if (err) $.failure('db', err)
      else $.success()
    })
  })
})

let app = diet()
let staticServer = dietStatic({ path: dist })
app.footer(staticServer)
app.get('/', sendIndex)
app.get('/server', $ => {
  $.success()
})
app.missing(sendIndex)

app.listen(listen)
console.log('Serving WebLC2 on', listen)
