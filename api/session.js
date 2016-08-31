var passport = require('passport');
var secureRoute = require('./../server/secureRoute');

module.exports = (router) => {
  
  // /user => Get currently logged-in user's information
  router.get('/user', secureRoute, (req, res) => {
    res.json(req.user || {});
  });
};
