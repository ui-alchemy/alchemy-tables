angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("component/templates/tool_bar.html",
    "<div ng-model=\"table.data.columns\" colspan=\"{{ table.data.columns.length + 1 }}\">" +
    "  <span class=\"fl\">" +
    "    <input type=\"text\" placeholder=\"Search...\" ng-model=\"table.search_string\" on-enter=\"table.search(table.search_string)\">" +
    "    Showing {{ table.start }}-{{ table.offset }} of {{ table.total }} {{ table.model }}" +
    "  </span>" +
    "  <span class=\"fr\" ng-show=\"table.num_selected\">" +
    "    <span ng-model=\"table.num_selected\">{{ table.num_selected }} Selected</span>" +
    "    <a ng-click=\"deselect_all()\" href=\"\">Deselect All</a>" +
    "  </span>" +
    "</div>" +
    "");
});
