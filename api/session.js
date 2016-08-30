var express = require('express');

module.exports = function (router) {
  // Temp
  router.get('/ping', (req, res) => {
    res.send('hi.');
  });
};