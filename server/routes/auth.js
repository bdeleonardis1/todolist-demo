var express = require('express');
var router = express.Router();

var dbquery = require('./../db/db');

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    console.log(password);

    res.json({successful: true});
})

router.post('/createaccount', (req, res) => {
    const {firstname, lastname, username, password} = req.body;

    dbquery('SELECT * FROM users WHERE username = $1', [username], (rows) => {
        if (rows.length != 0) {
            return res.json({error: "Usename already in use"});
        }
        
        dbquery('INSERT INTO users(firstname, lastname, username, password) VALUES ($1, $2, $3, $4)',
            [firstname, lastname, username, password], (rows) => {
                res.json({successful: true});
            });
    });
})

router.post('/logout', (req, res) => {
    console.log("There has been a request to logout!");

    res.json({successful: true});
});

module.exports = router;