(function(angular) {

  'use strict';

  angular.module('auth0-exercise').service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];

  function authService($rootScope, lock, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var authenticated = !!userProfile;

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = null;
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
      authenticated: authenticated,
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})(angular);