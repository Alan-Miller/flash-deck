module.exports = function(app) {

  //————————————————————————————————————————————>> User
  app.get('/api/user/:userAuthId', (req, res) => {
    app.get('db').get_userID([req.params.userAuthId])
    .then(response => { res.status(200).send(response); })
  });


  //————————————————————————————————————————————>> Name
  app.get('/api/users/:userID', (req, res) => {
    app.get('db').get_users([req.params.userID, req.query.value])
    .then(response => { res.status(200).send(response); });
  });

  app.get('/api/user/:id/display_name', (req, res) => {
    app.get('db').get_displayName([req.params.id])
    .then(response => { res.status(200).send(response); });
  });


  //————————————————————————————————————————————>> Friends
  app.get('/api/friends/:user_id', (req, res) => {
    app.get('db').get_userFriends([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    });
  });

  app.get('/api/pending/:user_id', (req, res) => {
    app.get('db').get_pendingFriendships([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    });
  });

  app.post('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').post_friendshipInvite([req.params.inviter_id, req.params.invitee_id])
    .then(response => { 
        // res.status(200).send(response); 
        app.get('db').getPendingFriendships([req.params.inviter_id])
        .then(response => { 
            res.status(200).send(response); 
        });
    });
  });

  app.put('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').put_friendshipAccept([req.body.inviter_id, req.body.invitee_id])
    .then(response => { 
        res.status(200).send(response);
    });
  });


  //————————————————————————————————————————————>> Cards
  app.get('/api/cards/:id', (req, res) => {
    app.get('db').get_allCards([req.params.id])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.post('/api/card/:id', (req, res) => {
    app.get('db').post_saveCard([req.params.id, req.body.front, req.body.back])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.post('/api/cards/:id', (req, res) => {
    app.get('db').post_saveCards([req.params.id, req.body.cards])
    .then(response => {
        res.status(200).send(response);
    })
  });

  app.get('/api/collections/:userID', (req, res) => {
    app.get('db').get_collections([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.get('/api/collection/info/:userID', (req, res) => {
    app.get('db').get_allCollectionInfo([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });

  // app.get('/api/collections/:userID/:cardID', (req, res) => {
  //   app.get('db').get_theseCollections([req.params.userID, req.params.cardID])
  //   .then(response => {
  //       res.status(200).send(response);
  //   });
  // });

  app.put('/api/collections/:userID', (req, res) => {
    app.get('db').put_editCollections([req.params.userID, req.body.cardIDs, req.body.collectionIDs])
    .then(response => {
        res.status(200).send(response);
    });
  });
  
  app.post('/api/collection/:id', (req, res) => {
    app.get('db').post_saveCollection([req.params.id, req.body.name])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.put('/api/card/:cardFace/:cardID/:userID', (req, res) => {
    app.get('db')[`put_${req.params.cardFace}Content`]([req.body.newContent, req.params.cardID, req.params.userID])
      .then(response => {
        res.status(200).send(response);
    });
  });

  app.put('/api/card/:cardID/stop_showing', (req, res) => {
    app.get('db').put_stopShowing([req.params.cardID, req.body.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.put('/api/card/:cardID/show_less', (req, res) => {
    app.get('db').put_showLess([req.params.cardID, req.body.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.delete('/api/card/:cardID/:userID', (req, res) => {
    app.get('db').delete_card([req.params.cardID, req.params.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });

  app.delete('/api/cards/:userID', (req, res) => {
    app.get('db').delete_allCards([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    });
  });
}