(function (angular) {

  'use strict';

  angular.module('auth0-exercise')

  .directive('userCard', ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        profile: '=profile',
        expanded: '=expand',
        showEditBtn: '=showeditbtn',
        isAdmin: '=admin'
      },
      template: 
        '<div>' +
        '  <div class="card">' +
        '    <div class="header" ng-show="expanded">' +
        '      <div class="header-bg">' +
        '        <img ng-src="{{profile.picture}}">' +
        '      </div>' +
        '    </div>' +
        '    <fieldset>' +
        '      <legend>User Information</legend>' +
        '      <div class="content">' + 
        '        <label for="name">Name:</label><input type="text" name="name" ng-value="profile.name" ng-disabled="!isAdmin || !expanded" placeholder="Type a name" />' +
        '      </div>' +
        '      <div class="content">' + 
        '        <label for="email">Email address:</label><input type="text" name="email" ng-value="profile.email" ng-disabled="!isAdmin || !expanded" placeholder="Type an email" />' +
        '      </div>' +
        '      <div class="content" ng-show="expanded">' + 
        '        <label for="nickname">Nickname:</label><input type="text" name="nickname" ng-value="profile.nickname" ng-disabled="!isAdmin || !expanded" placeholder="Type a nickname" />' +
        '      </div>' +
        '      <div class="content" ng-show="expanded">' +
        '        Roles:' +
        '        <div class="indented" ng-repeat="role in profile.app_metadata.roles">' + 
        '          <p ng-bind="role"></p>' +
        '        </div>' +
        '      </div>' +
        '    </fieldset>' +
        '    <div class="content" ng-show="!expanded && showEditBtn">' +
        '      <button class="button--xsm bg-yellow" ng-click="viewDetails()">Edit {{profile.name}}</button>' +
        '    </div>' +
        '  </div>' +
        '  <button class="button-lg bg-grey big" ng-if="expanded && isAdmin">Save Changes</button>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.viewDetails = function () {
          $location.path('/users/' + scope.profile.user_id);
        };
      }
    }
  }])
})(angular);
