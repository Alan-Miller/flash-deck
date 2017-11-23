const cors = require('cors')
    , bodyParser = require('body-parser')

module.exports = app => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use((req, res, next) => { 
    console.log(`endpoint hit: ${req.method} ${req.url}`, '\n\n'); 
    next(); 
  }); 
  app.use(express.static( `${__dirname}/../build` )); // Turn off for dev testing
}