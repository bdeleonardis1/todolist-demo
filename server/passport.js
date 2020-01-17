var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var dbquery = require('./db/db');

passport.use(new LocalStrategy((username, password, cb) => {
    dbquery('SELECT uid, username, password FROM users WHERE username=$1', [username], (rows) => {
    if(rows.length > 0) {
        const first = rows[0];
        if (password == first.password) {
            cb(null, { id: first.uid, username: first.username});
        } else {
            cb(null, false);
        } 
    } else {
         cb(null, false)
       }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, cb) => {
    dbquery('SELECT uid, username FROM users WHERE uid = $1', [parseInt(id)], (rows) => {
        cb(null, rows[0]);
    });
});

module.exports = passport;