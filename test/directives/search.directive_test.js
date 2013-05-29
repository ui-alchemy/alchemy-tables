'use strict';

describe('Directive: Search', function () {
    var element,
        scope,
        testModel,
        keypress_event;

    beforeEach(module('alchemy', 'alch-templates'));

    beforeEach(function(){
        testModel = {
            search: function(searchTerm) {
                        return searchTerm;
                    },
            offset: 0,
            subtotal: 10,
            total: 20
        };
    });

    describe('', function(){

        beforeEach(inject(function($rootScope, $compile){
            element = angular.element('<div alch-search="model"></div>');

            scope = $rootScope;
            scope.model = testModel;

            keypress_event = jQuery.Event("keypress");
            keypress_event.which = 13;

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should call a search function provided by an attached model', inject(function ($rootScope, $compile) {
            expect(testModel.search('Search String')).toBe('Search String');
        }));

        it('should call a search function provided by an attached model when the Enter key is pressed', inject(function ($rootScope, $compile) {
            var searchInput = element.find('input');
            spyOn(testModel, 'search');

            $(searchInput).trigger(keypress_event);

            expect(testModel.search).toHaveBeenCalled();
        }));

        it('should set the offset, subtotal and total properties on the attached model', inject(function ($rootScope, $compile) {
            expect(testModel.offset).toBe(0);
            expect(testModel.subtotal).toBe(10);
            expect(testModel.total).toBe(20);
        }));
    });

});
