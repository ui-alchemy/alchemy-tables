'use strict';

describe('Directive: Search', function () {
    var element,
        scope,
        testModel;

    beforeEach(module('alchemy', 'alch-templates'));

    beforeEach(function(){
        testModel = {
            selectAll: function(selected) {
                        if (!selected) {
                            testModel.numSelected = 0;
                        }
                    },
            numSelected: 0,
            offset: 10,
            total: 20
        };
    });

    describe('', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<div alch-selected="model"></div>');

            scope = $rootScope;
            scope.model = testModel;

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should update the numSelected', inject(function ($rootScope, $compile) {
            testModel.numSelected = 5;

            expect(scope.model.numSelected).toBe(5);
        }));

        it('should reset the selected count to zero when deselect is clicked', inject(function ($rootScope, $compile) {
            var deselect = element.find('.deselect-action');

            scope.model.numSelected = 5;
            $(deselect).click();

            expect(testModel.numSelected).toBe(0);
            expect($(deselect).hasClass('disabled-link')).toBeTruthy();
        }));
    });

});
