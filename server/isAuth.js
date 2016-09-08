var jwt = require('express-jwt');

// Gather secrets
const clientId = process.env.AUTH0_CLIENT_ID || '';
const clientSecret = process.env.AUTH0_CLIENT_SECRET || '';

const authenticate = jwt({
  secret: new Buffer(clientSecret, 'base64'),
  audience: clientId
});

module.exports = authenticate;