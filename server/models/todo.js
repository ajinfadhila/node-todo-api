var mongoose = require("mongoose");
// todos adalah nama table dari database mongodb://localhost:27017/TodoApp
var Todo = mongoose.model("todos",{
  text:{
            type:String,
            required:true,
            minlength:1,
            trim:true
     },
  completed:{
        type:Boolean,
        default:false
     },
  completedAt:{
        type:Number,
        default:null
    }
});

// melempar data yg ada di dalamtable todos agar bisa di akses oleh file lain
module.exports = {Todo}
