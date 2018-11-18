const{MongoClient, ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  var dbo = db.db("mydb");

  if (err) {
    return console.log("unable to connect to MongoDB server");
  }
  console.log("connected to MongoDB server");
  dbo.collection("Todos").find({_id: new ObjectId("5be40216e3e1891af1826d12")}).toArray().then((docs)=>{
    console.log("Todos");
    let obj = JSON.stringify(docs,undefined,2)
    console.log(obj);
  },(err)=>{
    console.log("unable faces todos",err);
  })

  //cara melihat jumlah data yg ada di database mydb /table Todos
  // dbo.collection("Todos").find().count().then(function(count){
  //   console.log(`Todos count :${count}`);
  // },function(err){
  //   console.log("error bro");
  // });

  //cara meremove data
  // dbo.collection("Todos").remove(
  //   {_id: ObjectId("5be569ad40c7242ca488bdc6")
  //   }).then((docs)=>{
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined,2));
  // },(err)=>{
  //   console.log("unable faces todos",err);
  // });
});
