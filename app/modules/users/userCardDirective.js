(function (angular) {

  'use strict';

  angular.module('auth0-exercise')

  .directive('userCard', ['$rootScope', '$location', '$routeParams', 'auth0ApiService', 
    
    function ($rootScope, $location, $routeParams, auth0ApiService) {
  
      return {
        restrict: 'E',
        replace: true,
        scope: {
          profile: '=profile',
          expanded: '=expand',
          showEditBtn: '=showeditbtn',
          isAdmin: '=admin',
          saving: '=saving'
        },
        template: 
          '<div>' +
          '  <div class="card">' +
          '    <div class="header" ng-show="expanded">' +
          '      <div class="header-bg">' +
          '        <img ng-src="{{picture}}">' +
          '      </div>' +
          '    </div>' +
          '    <fieldset>' +
          '      <legend ng-show="expanded">User Information</legend>' +
          '      <div class="content">' + 
          '        <label for="email">Email address</label><input type="text" name="email" ng-value="profile.email" ng-model="profile.email" ng-disabled="!isAdmin || !expanded" placeholder="Type an email" />' +
          '      </div>' +
          '      <div class="content" ng-if="!newProfile && expanded">' + 
          '        <label>Name</label><span ng-bind="profile.name"></span>' +
          '      </div>' +
          '      <div class="content" ng-if="newProfile">' + 
          '        <label for="password">Password</label><input type="password" name="email" ng-value="profile.password" ng-model="profile.password" ng-disabled="!isAdmin || !expanded" placeholder="Choose a password" />' +
          '      </div>' +
          '      <div class="content" ng-if="!newProfile">' + 
          '        <label>Verified Email</label> <span ng-bind="profile.email_verified" ng-disabled="!isAdmin || !expanded"></span>' +
          '      </div>' +
          '      <div class="content" ng-show="expanded && !newProfile">' +
          '        <label>Roles</label>' +
          '        <div class="indented" ng-repeat="role in profile.app_metadata.roles">' + 
          '          <p ng-bind="role"></p>' +
          '        </div>' +
          '      </div>' +
          '    </fieldset>' +
          '    <div class="content" ng-show="!expanded && showEditBtn">' +
          '      <button class="button--xsm bg-yellow" ng-click="viewDetails()">Edit</button>' +
          '    </div>' +
          '  </div>' +
          '  <button class="button-lg bg-green big" ng-if="expanded && isAdmin" ng-click="save()"><span ng-hide="newProfile">Save Changes</span><span ng-show="newProfile">Create User</span></button>' +
          '  <button class="button-lg bg-red big" ng-if="expanded && isAdmin && !newProfile" ng-click="delete()">Delete User</button>' +
          '</div>',
        link: function (scope, element, attrs) {
          
          scope.newProfile = ($routeParams.action === 'create');

          scope.picture = scope.profile.picture || 'assets/images/placeholder.png';

          // View the expanded version of the User card. Admins can edit/delete.
          scope.viewDetails = function () {
            $location.path('/user/edit/' + scope.profile.user_id);
          };

          // Create or Update a User
          scope.save = function () {

            $rootScope.$broadcast('saving', true);

            var method = (scope.newProfile) ? 'createUser' : 'updateUser';
            auth0ApiService[method](scope.profile)
              .then(function () {
                var msg = (scope.newProfile) ? 'User created!' : 'User updated!';
                $rootScope.$broadcast('notify', {
                  'message': msg,
                  'type': 'success'
                });
              })
              .catch(function (error) {
                var msg = (scope.newProfile) ? 'Failed to create User.' : 'Failed to update User.';
                $rootScope.$broadcast('notify', {
                  'message': msg,
                  'type': 'warning'
                });
              })
              .finally(function () {
                $rootScope.$broadcast('saving', false);
              });
          };

          scope.delete = function () {
            
            $rootScope.$broadcast('saving', true);

            auth0ApiService.deleteUser(scope.profile.user_id)
              .then(function () {
                $rootScope.$broadcast('notify', {
                  'message': 'User deleted!',
                  'type': 'success'
                });
                $location.path('/');
              })
              .catch(function (error) {
                $rootScope.$broadcast('notify', {
                  'message': 'Failed to delete User.',
                  'type': 'warning'
                });
                console.error(error);
              })
              .finally(function () {
                $rootScope.$broadcast('saving', false);
              })
          };
        }
      }
    }
  ])
})(angular);
