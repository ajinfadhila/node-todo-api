const{ObjectID} = require('mongodb')
const{mongoose} = require('./../Server/db/mongoose');
const{Todo} = require('./../Server/models/todo');
const{User} = require('./../Server/models/user')

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

Todo.findByIdAndRemove('5bf3d1fbb086b0540a5533c5').then((todo)=>{
  console.log(todo);
});
