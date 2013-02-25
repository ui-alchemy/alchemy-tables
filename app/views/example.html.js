angular.module("app/views/example.html", []).run(function($templateCache) {
  $templateCache.put("app/views/example.html",
    "<table class=\"table\" alch-table=\"table_data\" row-select ng-controller=\"table1Ctrl\"></table>" +
    "<table class=\"table\" alch-table=\"table_data\" row-select ng-controller=\"table2Ctrl\"></table>" +
    "");
});
