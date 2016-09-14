(function (angular) {

  'use strict';

  angular.module('auth0-exercise')

  .directive('saving', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: 
        '<div class="saving" ng-class="{show: saving}">' +
        '  <div>Saving...</div>' +
        '</div>',
      link: function (scope, element, attrs) {
        
        scope.saving = false;

        $rootScope.$on('saving', function ($event, saving) {
          scope.saving = saving;
        });
      }
    }
  }])
})(angular);
