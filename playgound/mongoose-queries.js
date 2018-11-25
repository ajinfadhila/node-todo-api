const{mongoose} = require('./../Server/db/mongoose');
const{Todo} = require('./../Server/models/todo');
const{User} = require('./../Server/models/user')

var id = "5bed61ff400b8c40d81ddea3"

// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log("todos",todos);
// });
//
// Todo.find({_id:id}).then((todos)=>{
//   console.log(todos);
// });

// Todo.findById(id).then((todo)=>{
//   if (!todo) {
//     return console.log("Id not found");
//   }
//   console.log("todo by id",todo);
// }).catch((e)=> console.log(e));

User.findById("5beafb5a1fc438470acdb5f3").then((user)=>{
  if (!user) {
    console.log("id useer tidak ada");
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
})
