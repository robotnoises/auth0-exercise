module.exports = function(req, res, next) {
  if (!req.isAuthenticated() && req.path !== '/login' && req.path !== '/callback') {
    return res.redirect('/login');
  }
  next();
}