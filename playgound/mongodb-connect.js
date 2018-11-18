const MongoClient = require("mongodb").MongoClient;
// const {MongoClient, ObjectId} = require("mongodb");
// var obj = new ObjectId();
// // var nilai = obj("507c7f79bcf86cd7994f6c0e").valueOf()
//
// console.log(obj.valueOf());
MongoClient.connect("mongodb://localhost:27017/",(err,db)=>{
  var dbo = db.db("mydb"); //cara memanggil db
  // console.log(db.db("mydb"))
  if (err) {
    console.log("error bos");
  }
  // console.log(dbo);
  // dbo.collection('Todos').insertOne({
  //   text:'are you oke',
  //   completed: false
  // },(err,result) =>{
  //   if (err) {
  //     console.log("unable insert todo",err);
  //   }
  //   console.log("oke");
  //   console.log(JSON.stringify(result.ops, undefined,2));//simpan ke database
  // })

  //dbo.collection untuk menyimpan data di dalam table users, insertOne = untuk menyimpan data 1 per 1
  dbo.collection('users').insertOne({
    name:"juan mahendra",
    age:25,
    location:"jakarta"
  },function(err,result){
    if (err) {
      console.log("error gan")
    }

    console.log(result.ops[0]._id);
  });
// dbo.collection('Todos').insert({
//   text:'are you oke',
//   completed: false
// },(err,result) =>{
//   if (err) {
//     console.log("unable insert todo",err);
//   }
//   console.log("oke");
//   console.log(JSON.stringify(result.ops, undefined,2));//simpan ke database
// })
  db.close();
});
