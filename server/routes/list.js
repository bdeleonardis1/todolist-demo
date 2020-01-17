var express = require('express');
var router = express.Router();

var dbquery = require('../db/db');

router.get("/items/:userid", (req, res) => {
    dbquery('SELECT * FROM items WHERE userid = $1 ORDER BY priority', [parseInt(req.params.userid)], (rows) => {
        var items = [];
        rows.forEach((row) => {
            items.push(row.item);
        })
        res.json({items: items});
    });
});

router.post("/save/:userid", (req, res) => {
    dbquery('DELETE FROM items WHERE userid = $1', [parseInt(req.params.userid)], (_) => { 
        for (var i = 0; i < req.body.items.length; i++) {
            dbquery('INSERT INTO items VALUES($1, $2, $3)', [req.params.userid, req.body.items[i], i], (_) => {});
        }
        res.json({"success": true});
    });
});

module.exports = router;