angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("component/templates/table.html",
    "<thead>" +
    "  <tr>" +
    "    <th ng-show=\"row_select\">" +
    "      <input ng-click=\"select_all(rows)\" class=\"select_all\" type=\"checkbox\" name=\"select_all\" value=\"none\">" +
    "    </th>" +
    "    <th ng-click=\"sort(header)\" ng-show=\"header.show\" ng-repeat=\"header in columns\">" +
    "      {{ header.display }}" +
    "    </th>" +
    "  </tr>" +
    "</thead>" +
    "" +
    "<tbody>" +
    "  <tr ng-class=\"{active : row.selected }\" ng-repeat=\"row in rows\">" +
    "    <td ng-show=\"row_select\">" +
    "      <input ng-model=\"row.selected\" type=\"checkbox\" name=\"{{ row.id }}\" value=\"{{ row.id }}\">" +
    "    </td>" +
    "    <td ng-show=\"show_cell(cell)\" ng-repeat=\"cell in row.cells\">" +
    "      {{ cell.display }}" +
    "    </td>" +
    "  </tr>" +
    "</tbody>" +
    "");
});
