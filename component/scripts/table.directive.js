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

            $scope.show_cell = function(cell){
                var to_show;

                angular.forEach($scope.table.columns, function(header){
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

            $scope.$watch('table.all_selected', function(){
                var table = $scope.table;

                table.num_selected = table.all_selected ? table.rows.length : 0;

                angular.forEach(table.rows, function(row){
                    row.selected = table.all_selected;
                });
            });

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
                $scope.table.all_selected = false;
            };
        }
    };
});
