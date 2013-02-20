var Table = (function($, Backbone, Handlebars) {
    'use strict';

    var view = Backbone.View.extend({

        template : '\
            <table class="table {{ classes }}"> \
              <thead class="table-head"> \
                <tr> \
                  <th><input class="select_all" type="checkbox" name="select_all" value="none"></td> \
                  {{#each row_headers}} \
                    <th>{{ this }}</th> \
                  {{/each}} \
                </tr> \
              </thead> \
              <tbody class="table-body"> \
                {{#each rows}} \
                  <tr> \
                    <td><input class="row_select" type="checkbox" name="{{ id }}" value="{{ id }}"></td> \
                    {{#each cells}} \
                      <td>{{ this }}</td> \
                    {{/each}} \
                  </tr> \
                {{/each}} \
              </tbody> \
            </table>',

        initialize : function(config){
            this.settings = config;
            this.template = config['template'] ? config['template'] : this.template;
            this.el = config['target'];
            this.render(config['data']);
        },

        events : {
            'click .row_select'     : 'select_row',
        },

        render : function(data){
            var content = Handlebars.compile(this.template);
            
            data = $.extend(true, {}, data, this.settings);

            $(this.el).append(content(data));
        },

        select_row : function(event){
            console.log(select_row);
            event.currentTarget.parents('tr').css({ 'background-color' : 'red' });
        }

    });

    return view;

})(jQuery, Backbone, Handlebars);

angular.module('alchemy', [])
    .directive('alchemyTable', function(){
        return {
            restrict    : 'E',
            transclude  : true,

            controller : function($scope, $element){

                $scope.all_selected = false;

                $scope.select = function(row){
                    row.selected = !row.selected;
                }

                $scope.select_all = function(rows){
                    var selected = $scope.all_selected = !$scope.all_selected;

                    angular.forEach(rows, function(row){
                        row.selected = selected;
                    });
                }
            },

            template: ' \
                <table class="table"> \
                  <thead class="table-head"> \
                    <tr> \
                      <th><input ng-click="select_all(rows)" class="select_all" type="checkbox" name="select_all" value="none"></td> \
                      <th ng-repeat="header in row_headers">{{ header }}</th> \
                    </tr> \
                  </thead> \
                  <tbody class="table-body"> \
                    <tr ng-repeat="row in rows" ng-class="{active : row.selected }"> \
                      <td><input ng-model="row.selected" ng-click="select(row)" type="checkbox" name="{{ row.id }}" value="{{ row.id }}"></td> \
                      <td ng-repeat="cell in row.cells">{{ cell }}</td> \
                    </tr> \
                  </tbody> \
                </table>'
        };
    });

