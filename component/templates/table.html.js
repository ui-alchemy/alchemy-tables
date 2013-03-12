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