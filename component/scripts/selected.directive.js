'use strict';

/**
 * @ngdoc directive
 * @name alchemy.directive:alchSelected
 * @restrict A
 *
 * @scope
 *
 * @element ANY
 *
 * @description
 *   Provides a count of selected items and an action to de-select those items.
 *
 * @param {object} alchSelected object that selected functionality is attached to
 *
 * @example
     <example>
        <file name="index.html">
         <div ng-controller="SearchController">
           <div alch-selected="testModel"></div>
         </div>
        </file>
        <file name="script.js">
          function SearchController($scope) {
            $scope.testModel = {};

            $scope.testModel.numSelected = 5;
          }
         </file>
      </example>
 *
 */
angular.module('alchemy').directive('alchSelected', function(){
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            'selected' : '=alchSelected'
        },
        templateUrl: 'component/templates/selected.html',

        controller: ['$scope', function($scope) {
            $scope.deselectAll = function(){
                $scope.selected.selectAll(false);
            };
        }]
    };
});
