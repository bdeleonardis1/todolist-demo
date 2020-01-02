var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

var listRoutes = require("./routes/list.js");

app.use(cors());
app.use(bodyParser());
app.use('/list', listRoutes);

app.listen(8000, () => { console.log("Listening on port 8000")});