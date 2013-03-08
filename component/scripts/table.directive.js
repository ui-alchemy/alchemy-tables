'use strict';

angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: false,
        scope: {
            'table' : '=alchTable'
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

        }
    };
});

angular.module('alchemy').directive('rowSelect', function(){
    return {
        require: '^alchTable',
        scope: {
            'table' : '=alchTable'
        },

        controller : function($scope){
            var table = $scope.table;

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
        },

        link: function(scope){
            scope.row_select = true;
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
