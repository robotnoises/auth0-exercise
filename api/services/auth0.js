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
 * @method => HTTP method
 * @path => the API path
 * @body (optional) => the request body
 */

function auth0Request(method, path, body) {
  let options = {
      method: method,
      uri: `${apiBase}${path}`,
      json: true,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
  };

  if (body) {
    options.body = body;
  }

  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else {
        let resp = (response.body) ? response.body : response;
        resolve(resp);
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
 * @page (optional) => What page to fetch from Auth0 (10 users at a time)
 */

function listAllUsers(page) {
  let pg = page || 0;
  return auth0Request('GET', `/users?per_page=10&page=${pg}&include_totals=true&sort=created_at:1`);
}

function getUser(userId) {
  return auth0Request('GET', `/users/${userId}`);
}

function createUser(creds) {
  
  let requestBody = {
    email: creds.email || "",
    password: creds.password,
    connection: "Username-Password-Authentication"
  };

  return auth0Request('POST', '/users', requestBody);
}

function updateUser(userId, updates) {
  
  let formatted = {
    email: updates.email,
    connection: updates.identities[0].connection
  };

  return auth0Request('PATCH', `/users/${userId}`, formatted);
}

function deleteUser(userId) {
  return auth0Request('DELETE', `/users/${userId}`);
}

module.exports = {
  listAllUsers: listAllUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};