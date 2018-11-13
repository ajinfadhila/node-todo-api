const{MongoClient,ObjectId} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,db){
  var dbo = db.db("mydb")
  if (err) {
    console.log("error bro");
  }
  console.log("connect success");
  // deleteMany = menghapus semua value yg bernilai sama. semua vaue yg sama akan terhapus secara bersamaan
  // dbo.collection("Todos").deleteMany({text:"are you oke"}).then(function(result){
  //   console.log("delete berhasil guys");
  //   console.log(result.n);
  // });

  //deleteOne = hapus data 1 persatu
  // dbo.collection("Todos").deleteOne({text:"are you oke"}).then(function(result){
  //   console.log("berhasil guys");
  //   console.log(result);
  // });

  //findAndDelete
  // dbo.collection("Todos").findOneAndDelete({completed:false}).then(function(result){
  //   console.log(result);
  // });
  dbo.collection("Todos").findOneAndDelete({_id:ObjectId("5be91be09192bb1d2da0a5f3")}).then((results)=>{
    console.log(JSON.stringify(results, undefined, 2));
  });
});
