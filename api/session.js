var request = require('request');
var isAuth = require('./../server/isAuth');

module.exports = (router) => {

  // /session/logout => Log-out the current user
  router.get('/session/logout', isAuth, (req, res) => {
    request.get({
      'url': 'https://robotnoises.auth0.com/v2/logout',
      'qs': {
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
