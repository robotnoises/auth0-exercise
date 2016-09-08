var request = require('request');
var isRole = require('./../server/isRole');
var isAuth = require('./../server/isAuth');

module.exports = (router) => {

  // /user => Get currently logged-in user's information
  router.get('/user', isAuth, (req, res) => {
    res.status(200).send('OK');
  });

  // /user/:userId => Get a specific user
  router.get('/user/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    // Todo: get a specific user by id
    res.send('OK');
  });

  // /user/all => Get a list of all users
  router.get('/user/all', isRole.bind(undefined, 'admin'), (req, res) => {
    // Todo: get a list of Users
    res.send('OK');
  });
};
