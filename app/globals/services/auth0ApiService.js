(function(angular) {

  'use strict';

  angular.module('auth0-exercise').service('auth0ApiService', auth0ApiService);

  auth0ApiService.$inject = ['$http', '$q'];

  var apiBase = '/api/v1';

  function auth0ApiService($http, $q) {
    
    function getUserOrUsers(userId) {
      
      var id = (userId) ? '/' + userId : '';
      
      return $q(function (resolve, reject) {
        $http.get(apiBase + '/users' + id)
          .then(function (response) {
            if (response.data.users) {
              resolve(response.data.users);
            } else {
              var array = [];
              array.push(response.data);
              resolve(array);
            }
          })
          .catch(function(error) {
            reject(error);
          });
      }); 
    }

    function deleteUser(userId) {
      
      var id = (userId) ? '/' + userId : '';
      
      return $q(function (resolve, reject) {
        $http.delete(apiBase + '/users' + id)
          .then(function (response) {
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          });
      }); 
    }
    
    return {
      getUserOrUsers: getUserOrUsers,
      deleteUser: deleteUser
    }
  }
})(angular);