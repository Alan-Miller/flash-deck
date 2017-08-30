/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    IMPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const   express = require('express')
        ,massive = require('massive')
        ,bodyParser = require('body-parser')
        ,cors = require('cors')
        // ,controller = require('./controTller')
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


//————————————————————————————————————————————>> Cards
app.get('/api/cards/:id', (req, res) => {
    app.get('db').getAllCards([req.params.id])
    .then(response => {
        res.status(200).send(response);
    })
})

app.post('/api/cards/:id', (req, res) => {
    app.get('db').postSaveCard([req.params.id, req.body.front, req.body.back])
    .then(response => {
        res.status(200).send(response);
    })
});

app.put('/api/cards/:cardId/stop_showing', (req, res) => {
    app.get('db').putStopShowing([req.params.cardId, req.body.userId])
    .then(response => {
        res.status(200).send(response);
    })
})

app.put('/api/cards/:cardId/show_less', (req, res) => {
    app.get('db').putShowLess([req.params.cardId, req.body.userId])
    .then(response => {
        res.status(200).send(response);
    })
})

app.delete('/api/cards/:cardId/:userId', (req, res) => {
    app.get('db').deleteCard([req.params.cardId, req.params.userId])
    .then(response => {
        res.status(200).send(response);
    })
})


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LISTEN
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});