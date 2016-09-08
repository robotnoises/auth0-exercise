var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

// Express
var app = express();

/**
 * Middleware
 */

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));

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

app.get('/', (req, res) => {
  res.redirect('/app');
});
