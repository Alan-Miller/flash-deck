require('dotenv').config();
const express = require('express')
    
    , middleware = require('./middleware')
    , massive = require('./massive')
    , api = require('./api.js')
    , auth = require('./auth')
    // , ac = require('./controller')

    , { port } = require('../config')
    , app = module.exports = express();

massive(app);

middleware(app);

auth(app);

api(app);

app.listen(port, _ => { console.log(`Listening on port ${port}.`); });