angular.module("alch-templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/example.html",
    "<div ng-controller=\"table1Ctrl\">" +
    "  <h2>{{ title }}</h2>" +
    "  <div alch-table-toolbar=\"table_data\"></div>" +
    "  <table alch-table=\"table_data\" class=\"table stable focus stripe-row\" row-select=\"true\">" +
    "  </table>" +
    "</div>" +
    "");
}]);
