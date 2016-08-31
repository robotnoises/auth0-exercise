'use strict';

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
  
  // Check user's list of roles for a specific role
  function hasRole(role, roles) {
    roles.forEach((r) => {
      if (r === role) {
        return true;
      }
    });
    return false;
  }

  if (req.isAuthenticated() && hasRole(role, req.user._json)) {
    next();
  } else {
    return res.status(403).send('Not Authorized');
  }
};