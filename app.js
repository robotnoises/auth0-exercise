var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config');
var secure = require('./server/secureRoute');
var Auth0Strategy = require('passport-auth0');

const app = express();

// Gather secrets
const clientDomain = process.env.AUTH0_DOMAIN || '';
const clientId = process.env.AUTH0_CLIENT_ID || '';
const clientSecret = process.env.AUTH0_CLIENT_SECRET || '';

/**
 * Middleware
 */

app.use(cookieParser());
app.use(session({'secret': clientSecret, 'resave': false, 'saveUninitialized': false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', secure, express.static(__dirname + '/app'));

/**
 * Config passport
 */

const strategyOptions = {
  'domain': clientDomain,
  'clientID': clientId,
  'clientSecret': clientSecret,
  'callbackURL': '/callback'
};

function authStrategyHandler(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}

passport.use(new Auth0Strategy(strategyOptions, authStrategyHandler));

passport.serializeUser((user, done) => {
  done(null, user); // Todo: This is not a best practice
});

passport.deserializeUser((user, done) => {
  done(null, user); // Todo: This is not a best practice
});

/**
 * Start the application!
 */

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started.');

  // Wire-up the API
  require('./api')(app);
});

/**
 * Routes
 */

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
});

app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), (req, res) => {
  if (!req.user) {
    throw new Error('user null');
  }
  // We good.
  res.redirect('/app');
});

app.all('*', secure, (req, res) => {
  res.redirect('/app');
});
