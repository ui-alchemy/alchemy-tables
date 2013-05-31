'use strict';

/**
 * @ngdoc directive
 * @name alchemy.directive:alchSearch
 * @restrict A
 *
 * @scope
 *
 * @element ANY
 *
 * @description
 *   Provides a simple search input that includes data counts display and bindings
 *   to allow easy hooks into the inputs binding.
 *
 * @param {object} alchSearch object that search functionality and properties will be
 *                            attached to
 *
 * @example
     <example>
        <file name="index.html">
         <div ng-controller="SearchController">
           <div alch-search="testModel"></div>
         </div>
        </file>
        <file name="script.js">
          function SearchController($scope) {
            $scope.testModel = {};

            $scope.testModel.search = function() {

            };

            $scope.testModel.offset = 10;
            $scope.testModel.subtotal = 20;
            $scope.testModel.total = 30;
          }
         </file>
      </example>
 *
 */
angular.module('alchemy').directive('alchSearch', function(){
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            'search' : '=alchSearch'
        },
        templateUrl: 'component/templates/search.html'
    };
});
