/*———————————————————————————————————————————————————————————————*
  Requires
/*———————————————————————————————————————————————————————————————*/
require('dotenv').config();

const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')

    , massive = require('massive')
    , api = require('./api.js')
    , auth = require('./auth')

    , { port } = require('../config')
    , app = module.exports = express();


/*———————————————————————————————————————————————————————————————*
  Middleware
/*———————————————————————————————————————————————————————————————*/
massive({
  host: 'localhost'
  ,port: 5432
  ,database: 'flashdeck'
  //~~~~~~~~~~~~~~~~~~~~~~~ production
//   ,user: 'alan'
//   ,password: 'horses'
//   ,ssl: true
  //~~~~~~~~~~~~~~~~~~~~~~~ dev
  ,user: 'ashman'
})
.then(function(db) {
  app.set('db', db)
});

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static( `${__dirname}/../build` )); // Turn off for dev testing
app.use((req, res, next) => { console.log(req.url); next(); });


/*———————————————————————————————————————————————————————————————*
  Endpoints
/*———————————————————————————————————————————————————————————————*/
auth(app);

api(app);

/*———————————————————————————————————————————————————————————————*
  Listen
/*———————————————————————————————————————————————————————————————*/
app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});