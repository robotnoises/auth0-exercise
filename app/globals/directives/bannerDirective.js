(function (angular) {

  'use strict';

  /**
   * Notification messages must be an object of the form:
   * 
   * {
   *   message: 'some notification message.',
   *   type: 'success/warning'
   * }
   */

  angular.module('auth0-exercise')

  .directive('banner', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: 
        '<div class="banner" ng-hide="dismissed">' +
        '  <i class="fa fa-times dismiss" ng-click="dismiss()"></i>' +
        '  <div ng-repeat="n in notifications" class="message" ng-class="{success: n.type === \'success\', warning: n.type === \'warning\'}" ng-bind="n.message"></div>' +
        '</div>',
      link: function (scope, element, attrs) {
        
        scope.notifications = [];
        scope.dismissed = scope.notifications.length === 0;

        scope.dismiss = function () {
          scope.notifications = [];
          scope.dismissed = true;
        };

        $rootScope.$on('notify', function ($event, message) {
          scope.notifications.push(message);
          scope.dismissed = false;
        });
      }
    }
  }])
})(angular);
