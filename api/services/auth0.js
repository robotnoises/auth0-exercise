'use strict';

const request = require('request');

const apiBase = 'https://robotnoises.auth0.com/api/v2';
const apiToken = process.env.AUTH0_API_TOKEN || '';

// Private

/**
 * get() 
 * 
 * Get request to Auth0
 * 
 * @path => the API path
 * @body (optional) => the request body
 */

function get(path, body) {
  return new Promise((resolve, reject) => {
    request.get(`${apiBase}${path}`, {
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

// Public methods

/**
 * listAllUsers()
 * 
 * Get a list of all users
 * 
 * @page (optional) => 
 */

function listAllUsers(page) {
  let pg = page || 0;
  return get(`/users?per_page=10&page=${pg}&include_totals=true&sort=created_at:1`);
}

module.exports = {
  listAllUsers: listAllUsers
};