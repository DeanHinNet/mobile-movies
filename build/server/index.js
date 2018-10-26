const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const movies = require('./../database/movies/snagfilms.json');

const model = require('./../database/models/index.js');
const path = require('path');

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
    res.status(results.status).send(results);
  });
})

app.get('/api/movies', (req, res)=>{
    model.movies((results)=>{
      res.status(201).send(results);
    });
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/dist/'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(port, ()=>{
    console.log(`Movies listening on ${port}`);
})



