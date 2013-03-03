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

    $scope.table_data = tmp_data;

    $scope.sort = function(header){
        header.show = false;
    }
});

angular.module('componentExampleApp').controller('table2Ctrl', function($scope){
    var tmp_data = data(4);

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
            'cells' : cells
        })
    }

    return tmp;
};
