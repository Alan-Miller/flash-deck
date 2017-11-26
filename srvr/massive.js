const massive = require('massive')
    , { connection } = require('../config');

module.exports = app => {
  massive(connection).then(db => {app.set('db', db); console.log('db', db)} );
}