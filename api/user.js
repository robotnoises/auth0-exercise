var request = require('request');
var isAuth = require('./../server/isAuth');
var isRole = require('./../server/isRole');

module.exports = (router) => {

  // /user => Get currently logged-in user's information
  router.get('/user', isAuth, (req, res) => {
    res.json(req.user || {});
  });

  // /user/:userId => Get a specific user
  router.get('/user/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    // Todo: get a specific user by id
  });

  // /user/all => Get a list of all users
  router.get('/user/all', isRole.bind(undefined, 'admin'), (req, res) => {
    // Todo: get a list of Users
  });
};
