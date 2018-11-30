var jwt = require('jsonwebtoken');

var data = {
  id: 7
}
var token = jwt.sign(data, "grg34");
console.log(token);
//jwt.verify = untuk mengembalikan id yg sudah di encrype nam memunculkan iat:
var decoded = jwt.verify(token,'grg34');
console.log("decoded",decoded);

const {SHA256} = require("crypto-js");
// var message = "saya user number 3"
// var hash = SHA256(message).toString()
//hash meng encrypt sebuah pesan / value. jika valuenya berubah kode encrype akan berubah
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id:4
// }
// // output data = {id:4}
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+'somecreate').toString()
// }
// /*
// { data: { id: 4 },
//   hash: '41b1b08c04e2ed2933ed31d977b77edcd32dabe20c5dd04e28621ba6bcc250b5' }
// */
// // token.data = {id:4}
//
// // merubah id
// token.data.id = 5
//
// console.log(token);
// var resultHash = SHA256(JSON.stringify(token.data)+'somecreate').toString()
//
// if (resultHash === token.hash) {
//   console.log("data sebelum di rubah");
// }else{
//   console.log("data sesudah di rubah, jangan percaya");
// }
// console.log(token);
