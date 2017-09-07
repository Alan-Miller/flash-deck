/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    IMPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
require('dotenv').config();

const   express = require('express')
        ,cors = require('cors')
        ,bodyParser = require('body-parser')

        ,session = require('express-session')
        ,passport = require('passport')
        ,Auth0Strategy = require('passport-auth0')

        ,massive = require('massive')
        ,api = require('./api.js')

        ,{ port } = require('../config')
        ,app = module.exports = express();


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    MIDDLEWARE
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
massive({
  host: 'localhost'
  ,port: 5432
  ,database: 'flashdeck'
  //————————————————————————————————————————————>> production
//   ,user: 'alan'
//   ,password: 'horses'
//   ,ssl: true
  //————————————————————————————————————————————>> dev
  ,user: 'ashman'
})
.then(function(db) {
  app.set('db', db)
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static( `${__dirname}/../build` ));
app.use((req, res, next)=>{console.log(req.url);next();});


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Auth
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
    console.log(profile);
    done(null, profile);
}));

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/auth/me', (req, res, next) => {
    if (!req.user) res.status(400).send('User not found');
    else return res.status(200).send(req.user);
});
app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(302, '/login'); // front?
});


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    API endpoints
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
api(app);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    LISTEN
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.listen(port, function() {
    console.log(`Listening on port ${port}.`);
});