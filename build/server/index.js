const app = require('express')();
const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`Pool listening on ${port}`);
})



