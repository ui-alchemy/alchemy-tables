'use strict';

angular.module('alchemy').directive('alchTable', function(){
    return {
        restrict: 'A',
        transclude: true,
        scope : true,
        templateUrl: 'component/templates/table.html',

        controller: function(){}
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
