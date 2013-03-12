angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("app/views/example.html",
    "<div ng-controller=\"table1Ctrl\">" +
    "  <h2>{{ title }}</h2>" +
    "  <div alch-table-toolbar=\"table_data\"></div>" +
    "  <table alch-table=\"table_data\" class=\"table\" row-select=\"true\">" +
    "  </table>" +
    "</div>" +
    "" +
    "<div ng-controller=\"table2Ctrl\">" +
    "  <h2>{{ title }}</h2>" +
    "  <table class=\"table\" alch-table=\"table_data\" row-select=true></table>" +
    "</div>" +
    "");
});
