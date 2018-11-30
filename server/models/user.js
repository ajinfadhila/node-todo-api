var mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
const _ = require("lodash");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
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
  })
  UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject();
    // mengembalikan data hanya id dan emailnya saja
    return _.pick(userObject,['_id','email']);
  }

  // proses token
  UserSchema.methods.generateAuthToken = function(){
    var user = this
    var access = "auth"
    //keynya bebas
    var key = "123abc"
    var token = jwt.sign({_id:user._id.toHexString(),access},key).toString();

    user.tokens.push({access,token});
    return user.save().then(()=>{
      return token;
    });
  };
  // console.log(UserSchema.methods.generateAuthToken);

  UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    // return "ada"
    try {
      // verify harus memasukan token dan key yg sudah kita buat
      decoded = jwt.verify(token,"123abc");
    } catch (e) {
      // promise
      // return new Promise((resolve,reject)=>{
      //   reject()
      // })
      return Promise.reject()
    }
    // console.log(decoded.id);
    // console.log(token);
    var userme = User.findOne({
      '_id': decoded._id,
      'tokens.token':token,
      'tokens.access':'auth'
    });
    // console.log(userme);
    return userme
  }

  UserSchema.pre('save', function(next){
    var user = this
    const saltRounds = 5
    // console.log(user.password);
    bcrypt.genSalt(saltRounds,(err,salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash
        next();
      })
    })
    // res.send(User)
  });
var User = mongoose.model('User',UserSchema);

module.exports = {User}
