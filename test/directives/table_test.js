'use strict';

describe('Directive: Alchemy Tables', function () {
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

    describe('', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<table alch-table="table_data"></table>');

            scope = $rootScope;
            scope.table_data = {};
            scope.table_data.data = row_data;

            $compile(element)(scope);
            scope.$digest();
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
            var head = element.find('thead');

           expect(head.find('th').length).toBe(row_data.columns.length + 1);
        }));

        it('should be able to retrieve selected rows', function () {
            var selectedRows = scope.table_data.getSelectedRows();
            expect(selectedRows.length).toBe(0);

            scope.table_data.data.rows[0].selected = true;
            selectedRows = scope.table_data.getSelectedRows();
            expect(selectedRows.length).toBe(1);
            expect(selectedRows[0].id).toBe("row_1")
        });

        xit('should allow an action when clicking a column header', inject(function () {
            var column_id = undefined;

            scope.sort = function(column){
                if (column.id === 1){
                    column_id = column.id;
                }
            };

            $(element.find('th')[2]).click();

            expect(column_id).toBe(row_data.columns[0].id);
        }));
    });
});
