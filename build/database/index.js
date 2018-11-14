const mysql = require('mysql');
const credentials = require('./../../config.js');
const fs = require('fs')

module.exports = connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database,
    // ssl: {
    //   ca: fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem')
    // }
})
