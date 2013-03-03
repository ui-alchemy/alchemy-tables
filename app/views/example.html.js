angular.module("alch-templates").run(function($templateCache) {
  $templateCache.put("app/views/example.html",
    "<div ng-controller=\"table1Ctrl\">" +
    "  <table class=\"table\" alch-table=\"table_data\" row-select></table>" +
    "</div>" +
    "<table class=\"table\" alch-table=\"table_data\" row-select ng-controller=\"table2Ctrl\"></table>" +
    "");
});
