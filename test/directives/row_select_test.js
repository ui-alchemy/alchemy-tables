'use strict';

describe('Directive: Row Select', function () {
    var element, scope, row_data;

    beforeEach(module('alchemy', 'alch-templates'));

    beforeEach(function(){
        row_data = {
            'columns' : [{ 
                id : 1, 
                name : 'Column 1', 
                show : true 
            }, { 
                id: 2,
                name: 'Column 2',
                show: true
            }],
            'rows'        : [{
                'id'    : 'row_1',
                'cells' : [{
                    id: 1,
                    display: 1,
                    column: 1
                },{
                    id: 2,
                    display: 2,
                    column: 2
                }]
            },{
                'id': 'row_2',      
                'cells' : [{
                    id: 1,
                    display: 1,
                    column: 1
                },{
                    id: 2,
                    display: 2,
                    column: 2
                }]
            }]
        }
    });

    describe('table with row select', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<table alch-table="table_data" row-select></table>');

            scope = $rootScope;
            scope.table_data = row_data;

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should contain a checkbox in the table head', inject(function ($rootScope, $compile) {
            var checkbox = element.find('thead').find('input[type="checkbox"]');

            expect(checkbox.length).toBe(1);
        }));

        it('should allow selection of all rows', inject(function ($rootScope, $compile) {
            var checkbox = element.find('thead').find('input[type="checkbox"]');

            checkbox.click();

            expect(checkbox.is(':checked')).toBe(true);
        }));

    });

});
