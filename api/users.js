'use strict';

var request = require('request');
var isRole = require('./../utilities/isRole');
var isAuth = require('./../utilities/isAuth');
var auth0 = require('./services/auth0');

module.exports = (router) => {

  router.get('/users/', isRole.bind(undefined, 'admin'), (req, res) => {
    auth0.listAllUsers()
      .then((response) => {
        let status = response.statusCode || 200;
        res.status(status).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  router.get('/users/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    auth0.getUser(req.params.userId)
      .then((response) => {
        let status = response.statusCode || 200;
        res.status(status).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  router.post('/users/', isRole.bind(undefined, 'admin'), (req, res) => {
    auth0.createUser(req.body)
      .then((response) => {
        let status = response.statusCode || 200;
        res.status(status).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  router.patch('/users/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    auth0.updateUser(req.params.userId, req.body)
      .then((response) => {
        let status = response.statusCode || 200;
        res.status(status).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  router.delete('/users/:userId', isRole.bind(undefined, 'admin'), (req, res) => {
    auth0.deleteUser(req.params.userId)
      .then((response) => {
        let status = response.statusCode || 200;
        res.status(status).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};
