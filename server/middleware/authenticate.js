var {User} = require("./../models/user")
var authenticate = (req,res, next) =>{
  var token = req.header('x-auth');
  // token isinya kode yg ada di header postman
  //User dari require models/user.js
  // user dari isi di dalam models.user.js
  // user = data dari UserSchema.statics.findByToken yg sudah kita atur di models/user.js
  User.findByToken(token).then((user)=>{
    // jika usernya tidak ada
    if (!user) {
      console.log("usernya ga dpt");
      // langsung di reject dengan promise
      return Promise.reject()
    }
    res.send(user);
  }).catch((e)=>{
    res.status(401).send()
  })
}

module.exports = {authenticate}
