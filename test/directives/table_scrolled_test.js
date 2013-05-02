describe('table scroll', function () {
    var scope, scrollHandler;

    beforeEach(module('alchemy'));

    beforeEach(inject(function ($rootScope, $compile){
        scrollHandler = {
            doIt: function () {}
        };
        element = angular.element('<div table-scroll="scrollHandler.doIt()" style="height: 100px; overflow-y: auto;"><p style="height: 1000px;">lalala</p></div>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
    }));

    // TODO figure out why scrollTop isn't working here
    xit("calls the provided scroll function when the scroll top + offset is greater than the height.", function () {
        spyOn(scrollHandler, "doIt");
        element.scrollTop('900');
        element.trigger('scroll');
        expect(scrollHandler.doIt).toHaveBeenCalled();
    });
});