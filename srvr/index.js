/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    IMPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const   express = require('express')
        ,massive = require('massive')
        ,api = require('./api.js')
        ,bodyParser = require('body-parser')
        ,cors = require('cors')
        // ,controller = require('./controller')
        ,{ port } = require('../config')
        ,app = module.exports = express();


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    MIDDLEWARE
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
massive({
  host: 'localhost'
  ,port: 5432
  ,database: 'flashdeck'
  //————————————————————————————————————————————>> production
  // ,user: 'alan'
  // ,password: 'horses'
  // ,ssl: true
  //————————————————————————————————————————————>> dev
  ,user: 'ashman'
})
.then(function(db) {
  app.set('db', db)
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static( `${__dirname}/../public` ));


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    API endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
api(app);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LISTEN
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});