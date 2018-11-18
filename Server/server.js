const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")
// console.log(bodyParser);
const{mongoose}= require("./db/mongoose.js");
const{Todo} = require("./models/todo.js");
const{User} = require("./models/user.js");

const port = process.env.PORT || 3000;
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//
//
// // /bad - send back json with errorMessage
//
