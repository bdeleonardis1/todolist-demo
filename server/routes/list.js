var express = require('express');
var router = express.Router();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'ment',
  password: 'mentored',
  host: '127.0.0.1',
  database: 'todolist',
  port: 5432
});

router.get("/items/:userid", (req, res) => {
    pool.query('SELECT * FROM items WHERE userid = $1 ORDER BY priority', [parseInt(req.params.userid)], (err, result) => {
        var items = [];
        result.rows.forEach((row) => {
            items.push(row.item);
        })
        console.log("Items:", items)
        res.json({items: items});
      });
});

router.post("/save/:userid", (req, res) => {
    var serverRes = res;
    pool.query('DELETE FROM items WHERE userid = $1', [parseInt(req.params.userid)], (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        }

        console.log("Deleted");
        
        for (var i = 0; i < req.body.items.length; i++) {
            pool.query('INSERT INTO items VALUES($1, $2, $3)', [req.params.userid, req.body.items[i], i], (err, res) => {
                if (err) {
                    return console.error('Error executing query', err.stack);
                }
            });
        }
        serverRes.json({"success": true});
    });
});

module.exports = router;