'use strict';

describe('Directive: Alchemy Tables', function () {
    var element, scope, row_data;

    beforeEach(module('alchemy'));
    beforeEach(module('component/templates/table.html'));

    beforeEach(function(){
        row_data = {
            'row_headers' : ['Column 1', 'Column 2'],
            'rows'        : [{
                'id'    : 'row_1',
                'cells' : [1, 2]
            },
            {   'id'    : 'row_2',
                'cells' : [3, 4]
            }]
        }
    });

    describe('basic table', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<table alch-table="table_data"></table>');

            scope = $rootScope;

            $compile(element)(scope);
            scope.$digest();
    
            scope.$apply(function(){
                scope.table_data = row_data;
            })
        }));

        it('should generate a table body and head', inject(function () {
            var body = element.find('tbody'),
                head = element.find('thead');

            expect(body.length).toBe(1);
        }));

        it('should generate two rows', inject(function () {
            var body = element.find('tbody');

            expect(body.find('tr').length).toBe(2);
        }));

        it('should generate two columns', inject(function () {
            var body = element.find('thead');

            expect(body.find('th').length).toBe(row_data['row_headers'].length + 1);
        }));

    });


    describe('table with row select', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<table alch-table="table_data" row-select></table>');

            scope = $rootScope;
            $compile(element)(scope);
            scope.$digest();

            scope.$apply(function(){
                scope.table_data = row_data;
            })
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
