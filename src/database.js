const mysql = require('mysql');
const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'delilah',
});

mysqlconnection.connect(function(err) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('database is connected');
    }
});

module.exports = mysqlconnection;
