'use strict';

angular.module('componentExampleApp', ['alchemy'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/example.html',
        controller: 'ExampleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('componentExampleApp').controller('ExampleCtrl', function($scope){
});

angular.module('componentExampleApp').controller('table1Ctrl', function($scope){
    var tmp_data = data(8);

    $scope.table_data = {};
    $scope.table_data.data = tmp_data;

    $scope.title = "Table 1 - Main Example";
    $scope.table_data.model = "Systems";
    $scope.table_data.total = tmp_data.rows.length;
    $scope.table_data.start = 1;
    $scope.table_data.offset = tmp_data.rows.length;

    $scope.table_data.sort = function(header){
        angular.forEach($scope.table_data.columns, function(column){
            if( column.active ){
                column.active = false;
            }
        });
        header.active = true;
    }

    $scope.table_data.search = function(search_term){
        angular.forEach($scope.table_data.data.rows, function(row){
            var search_string = $scope.table_data.search_string;
            
            if( search_string !== undefined && search_string !== "" ){
                if( row.cells[0].display.toString() !== search_string.toString() ){
                    row.show = false;
                }
            } else {
                row.show = true;
            }
        });
    };
});

angular.module('componentExampleApp').controller('table2Ctrl', function($scope){
    var tmp_data = data(4);

    $scope.title = "Table 2 - Proving isolate scope";

    $scope.table_data = tmp_data;
});

function data(size){
    var i, j, cells =[],
        tmp = {
        columns : [],
        rows        : []
    };

    for( i=0; i < size; i += 1){
        tmp['columns'].push({ id : i, display : 'Column ' + i, show : true });
        cells = [];
        
        for(j=0; j < size; j+= 1){
            cells.push({ id : j + i, display : i +j, column_id : j });
        }

        tmp['rows'].push({
            'row_id': 'row_' + i,
            'show'  : true,
            'cells' : cells
        })
    }

    return tmp;
};
