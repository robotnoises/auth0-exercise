/**
 * saving
 * 
 * A directive that shows a nice-looking (debatable) saving dialog
 */

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

        /**
         * To change the state of this dialog, $broadcast an event 'saving'
         * with true or false, to toggle it on and off, respectively.
         */

        $rootScope.$on('saving', function ($event, saving) {
          scope.saving = saving;
        });
      }
    }
  }])
})(angular);
