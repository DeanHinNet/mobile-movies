const fs = require('fs');

module.exports = {
    host: '',
    user: '',
    password: '',
    database: '',
    ssl: {
      ca: fs.readFileSync(__dirname + '/build/database/rds-combined-ca-bundle.pem')
    }
}