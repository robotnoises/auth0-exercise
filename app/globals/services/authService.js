(function(angular) {

  'use strict';

  angular.module('auth0-exercise').service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', '$window'];

  function authService($rootScope, lock, authManager, $window) {

    function getUserProfile() {
      return JSON.parse(localStorage.getItem('profile')) || null;
    }
    
    function isAdmin() {
      var userProfile = getUserProfile();
      return (!!userProfile && Array.isArray(userProfile.roles) && userProfile.roles.includes('admin'));
    }

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      $window.location.href = 'https://robotnoises.auth0.com/v2/logout?returnTo=' + $window.location.origin + '&client_id=yYK1wf6fwwSOht7vyaRImwBJlM7NI0oV';
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      getUserProfile: getUserProfile,
      isAdmin: isAdmin,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})(angular);