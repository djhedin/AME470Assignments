var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/add", function (req, res) {
  console.log("GET/add req arrived");
  var a = parseInt(req.query.a);
  var b = parseInt(req.query.b);
  var c = a + b;
  res.send(a + " + " + b + " = " + c);
});

app.get("/sub", function (req, res) {
  console.log("GET/sub req arrived");
  var a = parseInt(req.query.a);
  var b = parseInt(req.query.b);
  var c = a - b;
  res.send(a + " - " + b + " = " + c);
});

app.get("/mult", function (req, res) {
  console.log("GET/mult req arrived");
  var a = parseInt(req.query.a);
  var b = parseInt(req.query.b);
  var c = a * b;
  res.send(a + " * " + b + " = " + c);
});

app.get("/div", function (req, res) {
  console.log("GET/div req arrived");
  var a = parseInt(req.query.a);
  var b = parseInt(req.query.b);
  var c = a / b;
  res.send(a + " / " + b + " = " + c);
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());
