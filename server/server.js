const express = require("express");
const bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")
// console.log(bodyParser);
const{mongoose}= require("./db/mongoose.js");
const{Todo} = require("./models/todo.js");
const{User} = require("./models/user.js");

var app = express()
var port = process.env.PORT || 3000;
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

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/', (req, res) => {
  console.log("benar");
});
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if (!todo) {
      return res.status(400).send();
    }
    // res.send(req.params);
    console.log(req.params.id);
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
})
app.listen(port,()=>{
  console.log(`server run port ${port}`);
});

module.exports = {app}
