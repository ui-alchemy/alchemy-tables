'use strict';

/**
 * @ngdoc directive
 * @name alchemy.directive:alchTable
 * @restrict A
 *
 * @description
 *
 * @example
 */
angular.module('alchemy').directive('alchTableToolbar', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'table' : '=alchTableToolbar'
        },
        templateUrl: 'component/templates/tool_bar.html',

        controller: ['$scope', function($scope){
            $scope.deselectAll = function(){
                $scope.table.selectAll(false);
            };
        }]
    };
});
