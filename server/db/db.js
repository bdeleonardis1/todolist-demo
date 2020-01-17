const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'ment',
  password: 'mentored',
  host: '127.0.0.1',
  database: 'todolist',
  port: 5432
});

async function query(qstring, params, callback) {
    pool.query(qstring, params, (error, result) => {
        if (error) {
            throw error;
        }
        callback(result.rows);
    });
}

module.exports = query;