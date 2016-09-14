(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$rootScope', '$scope', '$routeParams', '$q', 'authService', 'auth0ApiService',
    function ($rootScope, $scope, $routeParams, $q, authService, auth0ApiService) {
      
      // Scope properties

      $scope.profiles = [];
      $scope.action = $routeParams.action || 'viewall';
      $scope.isAuth = $rootScope.isAuthenticated;
      $scope.isAdmin = false;
      $scope.showEditBtn = false;
      $scope.expandCard = false;
      $scope.loaded = false;
      $scope.saving = false;

      // Init

      function waitForLocalProfile() {
        return $q(function (resolve) {
          if (authService.getUserProfile()) {
            resolve();
          } else {
            $rootScope.$on('userProfileSet', resolve);
          }
        });
      }
      
      function init() {
        // Set some flags
        $scope.isAdmin = authService.isAdmin();
        $scope.showEditBtn = $scope.action === 'viewall' && !$routeParams.id && $scope.isAuth && $scope.isAdmin;
        $scope.expandCard = !!$routeParams.id || !$scope.isAdmin || $scope.action === 'create';

        // If the user is not an Admin, just load their profile from localStorage
        if (!$scope.isAdmin) {
          $scope.profiles = [];
          $scope.profiles.push(authService.getUserProfile());
          $scope.loaded = true;
        } else if ($scope.action === 'viewall' || $scope.action === 'edit') {
          // Fetch a list of users or a specific user from Auth0
          auth0ApiService.getUserOrUsers($routeParams.id)
            .then(function (data) {
              $scope.profiles = data;
            })
            .catch(function (error) {
              console.error(error);
            })
            .finally(function () {
              $scope.loaded = true;
            });
        } else {
          // We're creating a new User
          $scope.profiles.push({});
          $scope.loaded = true;
        }
      }

      // Wait for a user profile to load, then initialize
      waitForLocalProfile().then(init);

      // Watch for changes to Auth state
      $rootScope.$watch('isAuthenticated', function (auth) {
        $scope.isAuth = auth || false;
      });
    }]);

} (angular))