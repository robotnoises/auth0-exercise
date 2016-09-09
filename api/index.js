var express = require('express');
const router = express.Router({ mergeParams: true });

module.exports = (app) => {
  // Set-up the API route base
  app.use('/api/v1', router);

  // Include various API route controllers
  require('./user')(router);
}