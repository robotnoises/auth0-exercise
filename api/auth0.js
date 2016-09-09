'use strict';

const request = require('request');

function listAllUsers(page) {
  
  let pg = page || 0;
  let apiToken = process.env.AUTHO_API_TOKEN || '';
  let clientDomain = 'robotnoises.auth0.com';

  return new Promise((resolve, reject) => {
    request.get(`https://robotnoises.auth0.com/api/v2/users?per_page=10&read:users&page=${pg}&include_totals=true&sort=created_at:1`, {
      headers: {
        'auth0_domain': clientDomain,
        'auth0_token': apiToken
      }
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}

module.exports = {
  listAllUsers: listAllUsers
};