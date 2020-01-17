var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

var listRoutes = require("./routes/list");
var authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/list', listRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
});

app.get('/login', (req, res) => {
    res.redirect('http://localhost:3000/login');
});

app.listen(8000, () => { console.log("Listening on port 8000")});