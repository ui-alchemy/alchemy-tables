'use strict';

angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        scope: {
            'table' : '=alchTable',
            'rowSelect' : '@'
        },
        templateUrl: 'component/templates/table.html',

        controller: function($scope){
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
        }
    };
});

angular.module('alchemy').directive('alchTableToolbar', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'table' : '=alchTableToolbar'
        },
        templateUrl: 'component/templates/tool_bar.html',

        controller: function($scope){
            $scope.deselect_all = function(){
                $scope.table.select_all(false);
            };
        }
    };
});
