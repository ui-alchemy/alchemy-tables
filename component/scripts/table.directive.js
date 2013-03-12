'use strict';

angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            'table' : '=alchTable',
            'rowSelect' : '@'
        },
        templateUrl: 'component/templates/table.html',

        controller: function($scope){
            var table = $scope.table;

            $scope.show_cell = function(cell){
                var to_show;

                angular.forEach(table.columns, function(header){
                    if( header.id === cell.column_id ){
                        to_show = header.show;
                    }
                });

                return to_show;
            };

            $scope.show_row = function(row){
                return row.show;
            };

            $scope.table.select_all = function(selected){
                if( selected !== undefined ){
                    table.all_selected = selected;
                }

                table.num_selected = table.all_selected ? table.rows.length : 0;

                angular.forEach(table.rows, function(row){
                    row.selected = table.all_selected;
                });
            };

            $scope.adjust_num_selected = function(selected){
                table.num_selected += selected ? 1 : -1;
            };

        }
    };
});

angular.module('alchemy').directive('alchTableToolbar', function(){
    return {
        require: '^alchTable',
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
