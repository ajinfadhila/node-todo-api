var mongoose = require("mongoose");
var validator = require("validator")
var User = mongoose.model('users',{
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      validator: validator.isEmail,
      message: `{VALUE} is not valid email`
    }
  },name:{
    type:String,
    trim:true,
    minlength:1
  },password:{
    type:String,
    require:true,
    minlength: 6
  }, tokens:[{
      access:{
        type:String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
  }]
});

module.exports = {User}
