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

function ExampleCtrl($scope){
};

function table1Ctrl($scope){
    var tmp_data = data(12);

    $scope.table_data = tmp_data;
};

function table2Ctrl($scope){
    var tmp_data = data(2);

    $scope.table_data = tmp_data;
};

function data(size){
    var i, j, cells =[],
        tmp = {
        row_headers : [],
        rows        : []
    };

    for( i=0; i < size; i += 1){
        tmp['row_headers'].push('Column ' + i);
        cells = [];
        
        for(j=0; j < size; j+= 1){
            cells.push(j + i);
        }

        tmp['rows'].push({
            'id'    : 'row_' + i,
            'cells' : cells
        })
    }

    return tmp;
};
