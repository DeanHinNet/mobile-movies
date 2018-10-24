const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const movies = require('./api.json');
const cookiesMiddleware = require('universal-cookie-express');
const model = require('./../database/models/index.js');

app
  .use(bodyParser.json())
  .use(express.static(__dirname + '/../client/dist/'));

app.post('/register', (req, res)=>{
  model.user.create(req.body, (results)=>{
    res.status(results.status).send(results);
  });
})

app.post('/login', (req, res)=>{
  model.user.login(req.body, (results)=>{
    console.log('login results', results)
    res.status(results.status).send(results);
  });
})

app.get('/api/movies', (req, res)=>{
    res.status(201).send(movies);
})
app.listen(port, ()=>{
    console.log(`Movies listening on ${port}`);
})



