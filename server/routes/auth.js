var express = require('express');
var router = express.Router();

var dbquery = require('./../db/db');
var passport = require('../passport');

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            return res.json({ successful: false });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.json({ successful: false });
            }

            return res.json({ successful: true });
        });
    })(req, res, next);
});

router.post('/createaccount', (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    dbquery('SELECT * FROM users WHERE username = $1', [username], (rows) => {
        if (rows.length != 0) {
            return res.json({ error: "Usename already in use" });
        }

        dbquery('INSERT INTO users(firstname, lastname, username, password) VALUES ($1, $2, $3, $4)',
            [firstname, lastname, username, password], (rows) => {
                res.json({ successful: true });
            });
    });
})

router.post('/logout', (req, res) => {
    req.logout();
    res.json({successful: true});
});

module.exports = router;