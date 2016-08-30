var passport = require('passport');

module.exports = (router) => {
  
  // /callback => Handle Auth0 new session callback
  router.get('/callback', 
    passport.authenticate('auth0', { failureRedirect: '/client/#/session' }),
    (req, res)  => {
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect("/user");
    });
};


