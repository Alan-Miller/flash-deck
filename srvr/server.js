require('dotenv').config();
const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')

    , massive = require('./massive')
    , api = require('./api.js')
    , auth = require('./auth')
    // , ac = require('./controller')

    , { port } = require('../config')
    , app = module.exports = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => { console.log('req url:', req.url); next(); }); // logs each url
// app.use(express.static( `${__dirname}/../build` )); // Turn off for dev testing

// Massive config
massive(app);

// Auth endpoints and middleware
auth(app);

// API endpoints
api(app);

// Listen
app.listen(port, _ => { console.log(`Listening on port ${port}.`); });