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
angular.module('alchemy').directive('alchTable', ['$window', '$location', function ($window, $location) {
    return {
        restrict: 'A',
        scope: {
            'table' : '=alchTable',
            'rowSelect' : '@'
        },
        templateUrl: 'component/templates/table.html',

        link: function (scope, element) {
            // Load the next page of results if the
            scope.$watch('table.data.rows', function (newValue, oldValue) {
                if (scope.table.hasOwnProperty('nextPage')) {
                    // Only do this when directive first initializes
                    if ((newValue && !oldValue) || $location.search()) {
                        var space = $window.innerHeight - (element[0].offsetTop + element[0].offsetHeight);
                        if (space > 0) {
                            scope.table.nextPage();
                        }
                    }
                }
            });
        },

        controller: ['$scope', function($scope){
            // Initialize table properties
            $scope.table.numSelected = 0;
            $scope.table.allSelected = false;

            if (!$scope.table.scrollDistance) {
                $scope.table.scrollDistance = 0;
            }

            $scope.showCell = function(cell){
                var toShow;

                angular.forEach($scope.table.data.columns, function(header){
                    if( header.id === cell.columnId ){
                        toShow = header.show;
                    }
                });

                return toShow;
            };

            $scope.showRow = function(row){
                return row.show;
            };

            $scope.adjustNumSelected = function(selected){
                var table = $scope.table;

                table.numSelected += selected ? 1 : -1;
                table.allSelected = false;

                if (table.numSelected < 0) {
                    table.numSelected = 0;
                }
            };

            $scope.table.getSelectedRows = function () {
                var selected = [];
                angular.forEach($scope.table.data.rows, function (row) {
                    if (row.selected) {
                        selected.push(row);
                    }
                });
                return selected;
            };

            $scope.table.selectAll = function(selected){
                var table = $scope.table;

                if( selected !== undefined ){
                    table.allSelected = selected;
                }

                table.numSelected = table.allSelected ? table.data.rows.length : 0;

                angular.forEach(table.data.rows, function(row){
                    row.selected = table.allSelected;
                });
            };

            $scope.table.moreResults = function(){
                var more = $scope.table.total > $scope.table.offset;

                more = more && $scope.table.allSelected;
                return more;
            };
        }]
    };
}]);
