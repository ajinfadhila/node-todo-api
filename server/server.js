const express = require("express");
const bodyParser = require("body-parser")
// console.log(bodyParser);
const{mongoose}= require("./db/mongoose.js");
const{Todo} = require("./models/todo.js");
const{User} = require("./models/user.js");

var app = express()
var port = 3000;
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
app.listen(port,()=>{
  console.log(`server run port ${port}`);
})
