var passport = require('passport');
var request = require('request');
var secure = require('./../server/secureRoute');

module.exports = (router) => {
  
  // Todo: securing these routes may be unnecssary now that app.all('*' ...) is secure

  // /session/user => Get currently logged-in user's information
  router.get('/user', secure, (req, res) => {
    res.json(req.user || {});
  });

  // /session/logout => Log-out the current user
  router.get('/logout', secure, (req, res) => {
    request.get({
      'url': 'https://robotnoises.auth0.com/logout',
      'qs': {
        'return_to': '/login',
        'client_id': req.user._json.clientId
      }
    }, (error, response) => {
      if (!error) {
        req.session.destroy(() => {
          res.clearCookie('connect.sid');
          res.send(response);
        });
      } else {
        res.send(error);
      }
    });
  });

};
