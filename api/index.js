var express = require('express');
const router = express.Router({ mergeParams: true });

module.exports = function (app) {
  // Set-up the API route base
  app.use('/api/v1', router);
  // Wire-up routes
  router.use('/session', router);
  // Include various API route controllers
  require('./session')(router);
}