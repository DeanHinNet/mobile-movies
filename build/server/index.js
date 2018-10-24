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

app.post('/login', (req, res)=>{
  model.user.create(req.body, (results)=>{
    console.log('callbacks')
    res.status(201).send(results);
  });
})

app.get('/api/movies', (req, res)=>{
    res.status(201).send(movies);
})
app.listen(port, ()=>{
    console.log(`Movies listening on ${port}`);
})



