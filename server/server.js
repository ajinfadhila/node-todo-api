const express = require("express");
const bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")
// console.log(bodyParser);
const{mongoose}= require("./db/mongoose.js");
const{Todo} = require("./models/todo.js");
const{User} = require("./models/user.js");


var app = express()
var port = process.env.PORT || 3000;
var http = require('http');
var server = http.Server(app);

server.listen(port,()=>{
  console.log(`server run port ${port}`);
});

module.exports = {app}
