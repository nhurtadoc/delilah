const mysql = require('mysql');

const dataDB = require('./properties');

const mysqlconnection = mysql.createConnection({
    host: dataDB.dbhost,
    user: dataDB.dbusername,
    password: dataDB.dbpassword,
    database: dataDB.database,
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
