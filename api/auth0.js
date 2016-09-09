'use strict';

const request = require('request');

function listAllUsers(page) {
  
  let pg = page || 0;
  let apiToken = process.env.AUTH0_API_TOKEN || '';

  return new Promise((resolve, reject) => {
    request.get(`https://robotnoises.auth0.com/api/v2/users?per_page=10&page=${pg}&include_totals=true&sort=created_at:1`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`
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