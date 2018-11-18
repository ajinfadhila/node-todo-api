const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
var http = require('http');
var server = http.Server(app);

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//
//
// // /bad - send back json with errorMessage
//
