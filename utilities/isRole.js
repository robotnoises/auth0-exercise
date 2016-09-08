'use strict';

var jwt = require('jsonwebtoken');

/**
 * isRole()
 * 
 * A special middleware that checks for authentication and a specific role
 * set by Auth0. As of now there are only two roles: "user" and "admin."
 * 
 * "isRole" should only be used in this manner:
 * 
 * router.get('/foo', isRole.bind(undefined, 'admin'), ...)
 * 
 * ... the idea being to binding the role value to isRole as a partial function.
 */

module.exports = (role, req, res, next) => {
  
  // Gather secrets
  const clientSecret = process.env.AUTH0_CLIENT_SECRET || '';

  let token;
  let decoded = {};
  let roles = [];

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, new Buffer(clientSecret, 'base64'));
    roles = decoded.roles || [];
  } catch (ex) {
    console.error(ex);
  }

  // Check user's list of roles for a specific role
  function hasRole(role, roles) {
    for (var i = 0, max = roles.length; i < max ; i++) {
      if (roles[i] === role) {
        return true;
      }
    }
    return false;
  }

  if (token && hasRole(role, roles)) {
    next();
  } else {
    return res.status(403).send('Not Authorized');
  }
};