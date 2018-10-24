const db = require('./../../database/index.js');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const saltRounds = 6;

db.connect();

module.exports = {
  snagfilms: ()=>{

  },
  user: {
    isEmailPresent: (email, callback)=>{
      const queryStr = 'SELECT * FROM users WHERE email = ?';
      console.log('email check', email);
      db.query(queryStr, email, (err, data)=>{
        if (err) throw err;
        console.log('data email', data.length);
        callback(data.length !== 0);
      })
    },
    create: (params, callback)=>{
      console.log('loggin model check', params);
      const now = new Date();
      params = {
        username: params.username,
        email: params.email,
        password: params.password,
        first_name: params.first_name,
        last_name: params.last_name,
        created_at: now,
        modified_at: now,
        token: ''
      }
      module.exports.user.isEmailPresent(params.email, (present)=>{
        if(!present){
          bcrypt.genSalt(saltRounds, (err, salt)=>{
            if (err) throw err;
            bcrypt.hash(params.password, salt, (err, hash)=>{
              if (err) throw err;
  
              const queryStr = 'INSERT INTO users SET ?';
              const token = bcrypt.hashSync('bacon', 2);
              params.token = token;
              params.password = hash;
              db.query(queryStr, params, (err, data)=>{
                if (err) throw err;
                callback({
                  token: params.token,
                  name: params.first_name,
                  message: 'Your account has been created',
                  status: 201
                });
              });
            })
          })
        } else {
          callback({
            message: 'Email already exists. Please login.',
            status: 201
          });
        }
      })
   
  
    },
    read: ()=>{

    },
    update: ()=>{

    },
    delete: ()=>{

    }
  }
}