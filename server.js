const express = require('express')
const app = express()
path = require("path"),
  fs = require("fs")
port = 7000;
const router = require('./router')

app.use('/assets', express.static(path.join(__dirname, 'public')))
app.use('/', router)

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})