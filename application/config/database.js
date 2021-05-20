const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',//this is my password for a ton of stuff lol sorry
    database: 'termproject',
    debug: false,

});

/*pool.connect(function(err){
    console.log("connect");
})*/

//const promisePool = pool.promise();

module.exports = pool.promise();
//module.exports = promisePool;