/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    IMPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const   express = require('express')
        ,massive = require('massive')
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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//————————————————————————————————————————————>> Name
app.get('/api/users', (req, res) => {
    app.get('db').getUsers([req.query.value])
    .then(response => { res.status(200).send(response); });
});

app.get('/api/user/:id/display_name', (req, res) => {
    app.get('db').getDisplayName([req.params.id])
    .then(response => { res.status(200).send(response); });
});

//————————————————————————————————————————————>> Friends
app.get('/api/friends/:user_id', (req, res) => {
    app.get('db').getUserFriends([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    });
});

app.get('/api/pending/:user_id', (req, res) => {
    app.get('db').getPendingFriendships([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    });
});

app.post('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').postFriendshipInvite([req.params.inviter_id, req.params.invitee_id])
    .then(response => { 
        // res.status(200).send(response); 
        app.get('db').getPendingFriendships([req.params.inviter_id])
        .then(response => { 
            res.status(200).send(response); 
        });
    });
});

app.put('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').putFriendshipAccept([req.body.inviter_id, req.body.invitee_id])
    .then(response => { 
        res.status(200).send(response);
    });
});


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LISTEN
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});