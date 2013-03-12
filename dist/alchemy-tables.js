angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("component/templates/table.html",
    "<thead>" +
    "  <tr>" +
    "    <th class=\"table-selection-row\" colspan=\"{{ table.columns.length +1 }}\" ng-show=\"table.all_selected\">" +
    "      All {{ table.offset }} results shown are currently selected.  " +
    "      <a href=\"\">Select all {{ table.total }} results.</a>" +
    "    </th>" +
    "  </tr>" +
    "  <tr>" +
    "    <th ng-show=\"rowSelect\">" +
    "      <input class=\"select_all\" type=\"checkbox\" name=\"select_all\" ng-click=\"table.select_all()\" ng-model=\"table.all_selected\">" +
    "    </th>" +
    "    <th ng-click=\"sort(header)\" ng-show=\"header.show\" ng-repeat=\"header in table.columns\" ng-class=\"{ active : header.active }\">" +
    "      {{ header.display }}" +
    "    </th>" +
    "  </tr>" +
    "</thead>" +
    "" +
    "<tbody>" +
    "  <tr ng-class=\"{active : row.selected }\" ng-repeat=\"row in table.rows\" ng-show=\"show_row(row)\">" +
    "    <td ng-show=\"rowSelect\">" +
    "      <input ng-model=\"row.selected\" type=\"checkbox\" name=\"{{ row.id }}\" value=\"{{ row.id }}\" ng-change=\"adjust_num_selected(row.selected)\">" +
    "    </td>" +
    "    <td ng-show=\"show_cell(cell)\" ng-repeat=\"cell in row.cells\">" +
    "      {{ cell.display }}" +
    "    </td>" +
    "  </tr>" +
    "</tbody>" +
    "");
});

angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("component/templates/tool_bar.html",
    "<div ng-model=\"table.columns\" colspan=\"{{ table.columns.length + 1 }}\">" +
    "  <span class=\"fl\">" +
    "    <input type=\"text\" placeholder=\"Search...\" ng-model=\"table.search_string\">" +
    "    Showing {{ table.start }}-{{ table.offset }} of {{ table.total }} {{ table.model }}" +
    "  </span>" +
    "  <span class=\"fr\">" +
    "    <span ng-model=\"table.num_selected\">{{ table.num_selected }} Selected</span>" +
    "    <a ng-click=\"deselect_all()\" href=\"\">Deselect All</a>" +
    "  </span>" +
    "</div>" +
    "");
});

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
