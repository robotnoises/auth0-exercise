var request = require('request');
var isRole = require('./../utilities/isRole');
var isAuth = require('./../utilities/isAuth');
var auth0 = require('./auth0');

module.exports = (router) => {

  // /user/all => Get a list of all users
  router.get('/user/all', isRole.bind(undefined, 'admin'), (req, res) => {
    
    auth0.listAllUsers()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  // /user/:userId => Get a specific user
  router.get('/user/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    // Todo: get a specific user by id
    res.send('OK');
  });
};
