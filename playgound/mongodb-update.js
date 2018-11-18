// const MongoClient = require("mongodb").MongoClient;
const{MongoClient, ObjectId } = require('mongodb');
// console.log(MongoClient);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  var dbo =db.db("mydb");

  if (err) {
    console.log("error bro");
  }
  console.log("berhasil");
  dbo.collection('users').findOneAndUpdate({
    _id: new ObjectId("5bea5e27df4c231508c729d5")
  }, {
    $set: {
      name: 'juan mahendra'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

});
