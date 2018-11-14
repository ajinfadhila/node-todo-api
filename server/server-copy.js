var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
console.log(mongoose);
// mengoneksikan ke database TodoApp
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model("Todos",{
  text:{type:String,require:true, minlength:1,trim:true},
  completed:{type:Boolean},
  completedAt:{type:Number, default:null}
});
//jika completed tidak di isi akan otomatis tercetak false karna defaultnya kita setting false
// jika completedAt tidak di isi/ di kosongkan akan mencetak nilai null. karna defaultnya kita setting null

var newTodo = new Todo({
  text: 12132,
  completedAt:"123342"
});

newTodo.save().then((doc)=>{
  console.log("Saved todo",doc);
},(e)=>{
  console.log("Unable to save todo");
});


/*
var otherTodo = new Todo({
  text:" aja gile"
});

otherTodo.save().then((doc)=>{
  console.log(JSON.stringify(doc, undefined,2));
},(e)=>{
  console.log(e._message);
}); */

// var User = mongoose.model('Users',{
//   email:{
//     type:String,
//     required:true,
//     trim:true,
//     minlength:1
//   },name:{
//     type:String,
//     trim:true,
//     minlength:1
//   }
// });
// var user = new User({
//   email:124555,
//   name:1233
// });
//
// user.save().then((doc)=>{
//   console.log('user saved',doc);
// },(e)=>{
//   console.log("unable to save user",e);
// });
