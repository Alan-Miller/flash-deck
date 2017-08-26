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
    // ,ssl: true`
})
.then(function(db) {
    app.set('db', db)
})

app.use(bodyParser.json());
app.use(cors());
app.use(express.static( `${__dirname}/../public` ))

app.get('/api/user/:id/username', (req, res) => {
    app.get('db').getUsername([req.params.id])
    .then(response => { res.status(200).send(response); });
});

app.get('/api/user/:id/displayname', (req, res) => {
    app.get('db').getDisplayName([req.params.id])
    .then(response => { res.status(200).send(response); });
});

app.get('/api/user/:id/friends', (req, res) => {
    app.get('db').getUserFriends([req.params.id])
    .then(response => { res.status(200).send(response); });
});

app.get('/api/user/:id/friend/:friend_id', (req, res) => {
    app.get('db').friendInvite([req.params.id, req.params.friend_id])
    .then(response => { res.status(200).send(response) });
})

app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});