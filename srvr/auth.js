/*———————————————————————————————————————————————————————————————*
  Auth requirements
/*———————————————————————————————————————————————————————————————*/
const session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0');

    
/*———————————————————————————————————————————————————————————————*
  Auth exports
/*———————————————————————————————————————————————————————————————*/
module.exports = function(app) {

    // console.log('ENV', process.env);
  
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new Auth0Strategy({
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK
  }, (accessToken, refreshToken, extraParams, profile, done) => {
    //   console.log('profile', profile, '\n\n'); // see if profile comes back from auth
      done(null, profile);
  }));

  app.get('/auth', passport.authenticate('auth0'));
  app.get('/auth/callback', passport.authenticate('auth0', {
      successRedirect: process.env.HOMEPAGE,
      failureRedirect: '/auth'
  }));
  
  passport.serializeUser((user, done) => {
    //   console.log('ser user', user, '\n\n');
      done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    //   console.log('des obj', obj, '\n\n');
      done(null, obj);
  });

  app.get('/auth/me', (req, res, next) => {
      console.log('auth/me check', req.user, '\n\n');
      if (!req.user) res.status(400).send('User not found');
      else return res.status(200).send(req.user);
  });
  app.get('/auth/logout', (req, res) => {
      req.logOut();
      return res.redirect(302, process.env.HOMEPAGE); // front?
  });

}