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
      scope: {
        admin: '=admin'
      },
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

        // Greetings
        function loadGreetings() {
          var userGreeting = 'Welcome! Since you\'re just a lowly User, all you can do is view your own profile. Sorry.';
          var adminGreeting = 'Almighty Admin, you may choose any profile to view or edit.';
          var userGreeted = localStorage.getItem('userGreeted');
          var adminGreeted = localStorage.getItem('adminGreeted');

          if (!scope.admin && !userGreeted) {
            localStorage.setItem('userGreeted', 'true');
            scope.notifications.push({ message: userGreeting, type: 'info' });
            scope.dismissed = false;
          } else if (scope.admin && !adminGreeted) {
            localStorage.setItem('adminGreeted', 'true');
            scope.notifications.push({ message: adminGreeting, type: 'info' });
            scope.dismissed = false;
          }
        }

        loadGreetings();
      }
    }
  }])
})(angular);
