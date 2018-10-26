const db = require('./../../database/index.js');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const saltRounds = 6;
const fs = require('fs');
const schedule = require('node-schedule');
const dirPath = __dirname + '/../movies/';

schedule.scheduleJob('12 * * * *', ()=>{
  axios.get('http://www.snagfilms.com/apis/films.json?limit=30')
    .then((movies)=>{
      const content = JSON.stringify(movies.data);
      const fileName = 'snagfilms.json';
      const date = new Date();
      const archiveName = `snagfilms [${date.getMonth() + '-' + date.getDay() + ' H' + date.getHours()}].json`;
      fs.writeFile(dirPath + archiveName, content, 'utf8', (err)=>{
        if (err) throw err;
        fs.writeFile(dirPath + fileName, content, 'utf8', (err)=>{
          if (err) throw err;
          console.log('API downloaded', new Date());
        })
      });

    })
    .catch((err)=>{
      console.log(err)
    })
});

db.connect();

module.exports = {
  movies: (callback)=>{
    //Get movies from file, return as API
    console.log('getting movies');
    let filePath = dirPath + 'snagfilms.json';
    fs.readFile(filePath, 'utf8', (err, data)=>{
      if (err) throw err;
      callback(JSON.parse(data));
    })
  },
  user: {
    isEmailPresent: (email, callback)=>{
      const queryStr = 'SELECT * FROM users WHERE email = ?';
      db.query(queryStr, email, (err, data)=>{
        if (err) throw err;
        callback(data.length !== 0);
      })
    },
    isUsernamePresent: (username, callback)=>{
      const queryStr = 'SELECT * FROM users WHERE username = ?';
      db.query(queryStr, username, (err, data)=>{
        if (err) throw err;
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
      
          // module.exports.user.isUsernamePresent(params.username, (present)=>{
          //   if(!present){

              bcrypt.genSalt(saltRounds, (err, salt)=>{
                if (err) throw err;
                bcrypt.hash(params.password, salt, (err, hash)=>{
                  if (err) throw err;
                  const queryStr = 'INSERT INTO users SET ?';
                  const token = bcrypt.hashSync('bacon', 2);
    
                  let expires = new Date();
                  expires.setDate(expires.getDate() + 30);
    
       
                  params.token = token;
                  params.token_expire = expires; 
                  params.password = hash;
                  db.query(queryStr, params, (err, data)=>{
                    if (err) throw err;
                    callback({
                      token: params.token,
                      first_name: params.first_name,
                      message: 'Your account has been created',
                      status: 201
                    });
                  });
                })
              })
            // } else {
            //   callback({
            //     message: 'Username is taken. Please choose a new username.',
            //     status: 422
            //   });
            // }
          // });
        } else {
          callback({
            message: 'Email already exists. Please login.',
            status: 422
          });
        }
      })
    },
    login: (params, callback)=>{
      module.exports.user.isEmailPresent(params.email, (present) => {

        if(present){
          const queryStr = 'SELECT * FROM users WHERE email=?';
          db.query(queryStr, params.email, (err, data) => {
            bcrypt.compare(params.password, data[0].password, (err, res)=>{
        
              if (err) throw err;
              if (res) {
                const today = new Date();
                let expires = new Date(data[0].token_expire);
                if(today < expires){
                  callback({
                    first_name: data[0].first_name,
                    token: data[0].token,
                    status: 201,
                    message: 'Login successful!'
                  });
                
                } else {
                  //Update token if expired.
                  expires = new Date();
                  expires.setDate(today.getDate() + 30);
                  const queryStr = `UPDATE users SET ? WHERE email='${data[0].email}'`;
                  const token = bcrypt.hashSync('bacon', 2);
                  const updates = {
                    token_expire: expires,
                    token: token
                  }
                  db.query(queryStr, updates, (err) => {
                    if (err) throw err;
                    callback({
                      first_name: data.first_name,
                      token: updates.token,
                      status: 201,
                      message: 'New login successful!'
                    });
                  });
                }
              
              } else {
                callback({
                  message: 'Incorrect password. Please try again.',
                  status: 422
                });
              }
            })
         
          });
        } else {
          callback({
            message: 'No email found. Please check email or create an account.',
            status: 422
          })
        }
      })
    }
  }
}