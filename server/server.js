require("./config/Config.js")
const _ = require("lodash")
const express = require('express');
const bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")
// console.log(bodyParser);
const{mongoose}= require("./db/mongoose.js");
const{Todo} = require("./models/todo.js");
const{User} = require("./models/user.js");
var {authenticate} =require('./middleware/authenticate.js')

const port = process.env.PORT;
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(bodyParser.json());

// untuk menyimpan hasil post data
app.post('/todos',(req,res)=>{
  // di dalam req ada objectkeys body di dalam body ada object keys nya text
  var todo = new Todo({
    text:req.body.text
  });
  // todo.save() = menyimpan ke database
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});
//app.get = mengambil semua data
app.get('/todos',(req,res)=>{
  // Todo = file todo.js yg ada di folder models
  Todo.find().then((todos)=>{
    // todos = nama parameter yg isinya adalah data dari table todos
    res.send(todos);
  },(e)=>{
    res.status(400).send(e);
  })
});

// ambil semua data dengan id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //jika object id nya tidak valid akan di kirim ke 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //proses pencarian id dengan find(id)
  Todo.findById(id).then((todo) => {
    // jika todo tidak ada lempar ke 404
    if (!todo) {
      return res.status(404).send();
    }
    console.log(id);
//kirim hasil todo
    res.send({todo});
    //jika eror kirim ke 404 catch(e)
  }).catch((e) => {
    res.status(400).send();
  });
});

//untuk mendelete data
app.delete('/todos/:id',(req,res)=>{
  //get id
  // console.log(req.params);
  var id = req.params.id;
  //validasi id
  if (!ObjectID.isValid(id)) {
    // console.log("id tidak ada bro",id);
    return res.status(404).send();
  }

  //remove id by todo
  Todo.findByIdAndRemove(id).then((todo) =>{
    //jika table bukan todo
    if (!todo) {
        return res.status(404).send();
    }
    // console.log(id);
    res.send({todo})
  }).catch((e)=>{
    res.status(404).send()
  });
});

app.patch('/todos/:id',(req,res)=>{
  // menampung _id
  let id = req.params.id;
  // body = menerima hasil perubahan yg di input melalu postman
  //tapi yg di terima hasil perubahannya hanya berdasarkan keys yg tercantum di dalam array
  var body = _.pick(req.body,['text','completed','completedAt'])
  //jika ObjectID nya ga valid
  if (!ObjectID.isValid(id)) {
    //kirim status error 404
      return res.status(404).send()
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getDay()
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  console.log(body.completedAt);
  //find id dan update
  Todo.findByIdAndUpdate(id,{$set: body}, {new:true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send()
    }
    // console.log(todo);
    res.send({todo})
  }).catch((e)=>{
    res.status(400).send();
  })
});

app.post('/users',(req,res)=>{
  //lebih sensitif atau lebih akurat dengan lodast.pick = _.pick
  var body = _.pick(req.body,["email","password"]);
  // hasil input yg ada di body di tampung ke dalam users
  // new User() sudah ada valueya di dalam models/user.js
  // body di join dengan user, ketika di panggil hasilnya sudah di setting seperti di dlm models.users
  var user = new User(body);
  //save ke database
  user.save().then(()=>{
    //jika hasil sesuai akan di kirim ke then
    return user.generateAuthToken();
    // res.send(user)
    //jika fail akan di kirim ke catch 404
  }).then((token)=>{
    res.header('x-auth', token).send(user)
  }).catch((e)=>{
    res.status(400).send(e);
  })
});


app.get('/users/me', authenticate,(req,res)=>{
  console.log(req.user);
  res.send(req.user)
});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
//
// // /bad - send back json with errorMessage
//
