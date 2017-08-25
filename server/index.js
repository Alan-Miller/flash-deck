const   express = require('express')
        ,massive = require('massive')
        ,bodyParser = require('body-parser')
        ,cors = require('cors')
        ,controller = require('./controller')
        ,{ port } = require('../config')
        ,app = express();

massive({
    host: 'localhost'
    ,port: 5432
    ,database: 'flashdeck'
    ,user: 'ashman'
    ,password: ''
    // ,ssl: true
})
.then(function(db) {
    app.set('db', db)
})

app.use(bodyParser.json());
app.use(cors());
app.use(express.static( `${__dirname}/../public` ))

app.get('/api/user/:id/handle', (req, res) => {
    app.get('db').getUserHandle([req.params.id])
    .then(response => { res.status(200).send(response); })
});

app.listen(3002, function() {
    console.log(`Listening on port ${port}.`);
});