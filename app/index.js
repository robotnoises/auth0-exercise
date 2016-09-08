'use strict';

angular.module('auth0-exercise', [
  'auth0-exercise.users',
  'auth0-exercise.auth',
  'auth0.lock', 
  'angular-jwt'
])
.config(['$httpProvider', 'lockProvider', 'jwtOptionsProvider', 'jwtInterceptorProvider', 
function ($httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {
  
  // Init provider for Auth0 Lock Widget
  lockProvider.init({
    clientID: 'yYK1wf6fwwSOht7vyaRImwBJlM7NI0oV',
    domain: 'robotnoises.auth0.com'
  });

  // Configure tokenGetter function to retrieve from localStorage
  jwtOptionsProvider.config({
    tokenGetter: function () {
      return localStorage.getItem('id_token');
    }
  });

  // Interceptor for subsequent requests
  $httpProvider.interceptors.push('jwtInterceptor');
}])
.run(function ($rootScope, authService, authManager) {
  $rootScope.authService = authService;
  authService.registerAuthenticationListener();
  authManager.checkAuthOnRefresh();
});