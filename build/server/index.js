const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const app = express();

const movies = require('./api.json');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist/'));

app.get('/api/movies', (req, res)=>{
    res.status(201).send(movies);
})
app.listen(port, ()=>{
    console.log(`Pool listening on ${port}`);
})



