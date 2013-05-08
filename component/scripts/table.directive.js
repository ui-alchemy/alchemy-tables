'use strict';

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
                // Only do this when directive first initializes
                if ((newValue && !oldValue) || $location.search()) {
                    var space = $window.innerHeight - (element[0].offsetTop + element[0].offsetHeight);
                    if (space > 0) {
                        scope.table.next_page();
                    }
                }
            });
        },

        controller: ['$scope', function($scope){
            // Initialize table properties
            $scope.table.num_selected = 0;
            $scope.table.all_selected = false;

            if (!$scope.table.scroll_distance) {
                $scope.table.scroll_distance = 0;
            }

            $scope.show_cell = function(cell){
                var to_show;

                angular.forEach($scope.table.data.columns, function(header){
                    if( header.id === cell.column_id ){
                        to_show = header.show;
                    }
                });

                return to_show;
            };

            $scope.show_row = function(row){
                return row.show;
            };

            $scope.adjust_num_selected = function(selected){
                $scope.table.num_selected += selected ? 1 : -1;
            };

            $scope.table.get_selected_rows = function () {
                var selected = [];
                angular.forEach($scope.table.data.rows, function (row) {
                    if (row.selected) {
                        selected.push(row);
                    }
                });
                return selected;
            };

            $scope.table.select_all = function(selected){
                var table = $scope.table;

                if( selected !== undefined ){
                    table.all_selected = selected;
                }

                table.num_selected = table.all_selected ? table.data.rows.length : 0;

                angular.forEach(table.data.rows, function(row){
                    row.selected = table.all_selected;
                });
            };

            $scope.table.more_results = function(){
                var more = $scope.table.total > $scope.table.offset;

                more = more && $scope.table.all_selected;
                return more;
            };
        }]
    };
}]);

angular.module('alchemy').directive('alchTableToolbar', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'table' : '=alchTableToolbar'
        },
        templateUrl: 'component/templates/tool_bar.html',

        controller: ['$scope', function($scope){
            $scope.deselect_all = function(){
                $scope.table.select_all(false);
            };
        }]
    };
});
