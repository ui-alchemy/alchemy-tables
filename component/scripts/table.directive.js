'use strict';

angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope: true,
        templateUrl: 'component/templates/table.html',

        controller: function($scope){
            $scope.show_cell = function(cell){
                var to_show;

                angular.forEach($scope.table_data.columns, function(header){
                    if( header.id === cell.column_id ){
                        to_show = header.show;
                    }
                });

                return to_show;
            };
        },

        link: function(scope, element, attrs){
            scope.$watch(attrs.alchTable, function(data){
                scope.rows = data.rows;
                scope.columns = data.columns;
            });
        }
    };
});

angular.module('alchemy').directive('rowSelect', function(){
    return {
        require: 'alchTable',

        controller : function($scope){
            $scope.all_selected = false;

            $scope.select_all = function(rows){
                var selected = $scope.all_selected = !$scope.all_selected;

                angular.forEach(rows, function(row){
                    row.selected = selected;
                });
            };
        },

        link: function(scope){
            scope.row_select = true;
        }
    };
});
