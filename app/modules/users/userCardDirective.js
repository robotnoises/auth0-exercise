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
        edit: '=edit'
      },
      template: 
        '<div class="card">' +
        '  <div class="header" ng-show="expanded">' +
        '    <div class="header-bg">' +
        '      <img ng-src="{{profile.picture}}">' +
        '    </div>' +
        '  </div>' +
        '  <div class="content">Name: <span ng-bind="profile.name"></span></div>' +
        '  <div class="content">Email address: <span ng-bind="profile.email"></span></div>' +
        '  <div class="content" ng-show="expanded">Nickname: <span ng-bind="profile.nickname"></span></div>' +
        '  <div class="content" ng-show="expanded">' +
        '    Roles:' +
        '    <div class="indented" ng-repeat="role in profile.roles" ng-bind="role"></div>' +
        '  </div>' +
        '  <div class="content" ng-show="!expanded && edit">' +
        '    <button class="button--xsm" ng-click="edit()">Edit {{profile.name}}</button>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.edit = function () {
          $location.path('/users/' + scope.profile.user_id);
        };
      }
    }
  }])
})(angular);
