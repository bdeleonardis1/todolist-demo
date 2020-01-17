var express = require('express');
var router = express.Router();

var dbquery = require('../db/db');

router.get('/firstname', (req, res) => {
    if (!req.user) {
        return res.json({noAuth: true});
    }

    console.log("In firstname")

    dbquery('SELECT firstname FROM users WHERE uid = $1', [req.user.uid], (rows) => {
        console.log(rows[0].firstname);
        return res.json({firstname: rows[0].firstname});
    })
});

router.get("/items", (req, res) => {
    if (!req.user) {
        return res.json({noAuth: true});
    }

    console.log("User:", req.user);

    dbquery('SELECT * FROM items WHERE userid = $1 ORDER BY priority', [parseInt(req.user.uid)], (rows) => {
        var items = [];
        rows.forEach((row) => {
            items.push(row.item);
        })
        res.json({items: items});
    });
});

router.post("/save", (req, res) => {
    if (!req.user) {
        return res.json({noAuth: true});
    }

    dbquery('DELETE FROM items WHERE userid = $1', [parseInt(req.user.uid)], (_) => { 
        for (var i = 0; i < req.body.items.length; i++) {
            dbquery('INSERT INTO items VALUES($1, $2, $3)', [req.user.uid, req.body.items[i], i], (_) => {});
        }
        res.json({"success": true});
    });
});

module.exports = router;