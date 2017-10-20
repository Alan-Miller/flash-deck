module.exports = function(app) {

  //————————————————————————————————————————————>> User
  app.get('/api/user/:userAuthID', (req, res) => {
    app.get('db').get_userID([req.params.userAuthID])
    .then(response => { res.status(200).send(response); })
    .catch(err => { console.log(err) });
  });


  //————————————————————————————————————————————>> Name
  app.get('/api/users/:userID', (req, res) => {
    app.get('db').get_users([req.params.userID, req.query.value])
    .then(response => { res.status(200).send(response); })
    .catch(err => { console.log(err) });
  });

  app.get('/api/user/:id/display_name', (req, res) => {
    app.get('db').get_displayName([req.params.id])
    .then(response => { res.status(200).send(response); })
    .catch(err => { console.log(err) });
  });


  //————————————————————————————————————————————>> Friends
  app.get('/api/friends/:user_id', (req, res) => {
    app.get('db').get_userFriends([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    })
    .catch(err => { console.log(err) });
  });

  app.get('/api/pending/:user_id', (req, res) => {
    app.get('db').get_pendingFriendships([req.params.user_id])
    .then(response => { 
        res.status(200).send(response); 
    })
    .catch(err => { console.log(err) });
  });

  app.post('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').post_friendshipInvite([req.params.inviter_id, req.params.invitee_id])
    .then(response => { 
        // res.status(200).send(response); 
        app.get('db').getPendingFriendships([req.params.inviter_id])
        .then(response => { 
            res.status(200).send(response); 
        });
    })
    .catch(err => { console.log(err) });
  });

  app.put('/api/friends/:inviter_id/:invitee_id', (req, res) => {
    app.get('db').put_friendshipAccept([req.body.inviter_id, req.body.invitee_id])
    .then(response => { 
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });


  //————————————————————————————————————————————>> Cards
  // Get all cards by user ID
  app.get('/api/cards/:id', (req, res) => {
    app.get('db').get_allCards([req.params.id])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Get deck by user ID
  app.get('/api/deck/:userID', (req, res) => {
    app.get('db').get_deck([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Create new card through modal
  app.post('/api/card/:id', (req, res) => {
    app.get('db').post_saveCard([req.params.id, req.body.front, req.body.back])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Batch create new cards with .csv file
  app.post('/api/cards/:id', (req, res) => {
    app.get('db').post_saveCards([req.params.id, req.body.cards])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  //————————————————————————————————————————————>> Collections

  // Get all existing collection names
  app.get('/api/collections/:userID', (req, res) => {
    app.get('db').get_collections([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Get all collection info, including which collections each card has
  app.get('/api/collection/info/:userID', (req, res) => {
    app.get('db').get_allCollectionInfo([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // app.get('/api/collections/:userID/:cardID', (req, res) => {
  //   app.get('db').get_theseCollections([req.params.userID, req.params.cardID])
  //   .then(response => {
  //       res.status(200).send(response);
  //   });
  // });

  // Add all selected collections to all selected cards
  app.put('/api/collections/:userID', (req, res) => {
    app.get('db').put_editCollections([req.params.userID, req.body.cardIDs, req.body.collectionIDs])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Remove single collection from card
  app.delete('/api/collections/:userID/:cardsInCollectionsID', (req, res) => {
    app.get('db').delete_removeCollection([req.params.userID, req.params.cardsInCollectionsID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });
  
  app.post('/api/collection/:id', (req, res) => {
    app.get('db').post_saveCollection([req.params.id, req.body.name])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  app.put('/api/card/:cardFace/:cardID/:userID', (req, res) => {
    app.get('db')[`put_${req.params.cardFace}Content`]([req.body.newContent, req.params.cardID, req.params.userID])
      .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  app.put('/api/card/:cardID/stop_showing', (req, res) => {
    app.get('db').put_stopShowing([req.params.cardID, req.body.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Toggle one card in deck
  app.put('/api/card/:cardID/current_deck', (req, res) => {
    app.get('db').put_currentDeck([req.params.cardID, req.body.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Add selected cards to deck
  app.patch('/api/deck/add/:userID', (req, res) => {
    app.get('db').patch_addToDeck([req.body.cardsArray, req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Remove selected cards from deck
  app.patch('/api/deck/remove/:userID', (req, res) => {
    app.get('db').patch_removeFromDeck([req.body.cardsArray, req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Delete single card
  app.delete('/api/card/:cardID/:userID', (req, res) => {
    app.get('db').delete_card([req.params.cardID, req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Delete all selected cards
  app.delete('/api/cards/:userID', (req, res) => {
    app.get('db').delete_cards([req.body.cardsArray, req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

  // Delete all of user's cards
  app.delete('/api/cards/:userID', (req, res) => {
    app.get('db').delete_allCards([req.params.userID])
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => { console.log(err) });
  });

}