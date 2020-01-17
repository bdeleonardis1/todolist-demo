var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

var listRoutes = require("./routes/list");
var authRoutes = require("./routes/auth");

var passport = require("./passport");

app.use(cors());

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/list', listRoutes);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
});

app.get('/login', (req, res) => {
    res.redirect('http://localhost:3000/login');
});

app.listen(8000, () => { console.log("Listening on port 8000")});