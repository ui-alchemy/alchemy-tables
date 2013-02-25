'use strict';


var alchemy = angular.module('alchemy', []);
    
alchemy.directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope : true,

        templateUrl: 'component/templates/table.html',

        controller: function($scope, $element){
        }

    }
});

alchemy.directive('rowSelect', function(){
    return {
        require: "alchTable",

        controller : function($scope, $element){
            $scope.all_selected = false;

            $scope.select_all = function(rows){
                var selected = $scope.all_selected = !$scope.all_selected;

                angular.forEach(rows, function(row){
                    row.selected = selected;
                });
            }
        },

        link: function(scope, element, attrs){
            scope.row_select = true;
        }
    }
});
