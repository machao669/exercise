var express = require('express');
var app = express();

var hostname = '127.0.0.1';
var port = 7999;

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/index', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/static/bundle.js', function (req, res) {
  res.sendFile( __dirname + "/static/commons.js" );
})

var server = app.listen(port, hostname, function () {
  
   var host = server.address().address
   var port = server.address().port
   console.log("应用实例，访问地址为 http://%s:%s", host, port)
  
 })
