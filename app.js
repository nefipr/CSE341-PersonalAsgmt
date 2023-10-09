const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes')

const port = process.env.PORT || 8080;
const app = express();
 
app.get('/', (req, res) => {
  res.send("Hello de mexico para el mundo");
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  })
  .use('/', routes);
 
mongodb.initDb((err, mongodb) => {
if (err) {
    console.log(err);
} else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
}
});