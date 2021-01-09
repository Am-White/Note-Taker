var express = require('express');


var app = express();
var PORT = process.env.PORT || 3030;

//Setting up express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

