describe('app directive: task', function () {
    var scope, isolateScope, el, details;

    var template = '<task details="details"></task>';

    var tasksMock = {
        save: sinon.stub()
    };

    beforeEach(function () {
        module('app');
        module(function ($provide) {
            $provide.value('tasks', tasksMock);
        });

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            details = {
                id: 0,
                description: 'Something you must do',
                priority: 1
            };
            scope.details = details;

            el = $compile(template)(scope);
            scope.$apply();
            isolateScope = el.isolateScope();
        });
    });

    it('saves the task using its id', function () {
        isolateScope.update();
        expect(tasksMock.save).to.have.been.calledWith(details.id);
    });

    it('does not mark tasks with a priority of 4', function () {
        scope.details.priority = 4;
        scope.$apply();
        expect(el.find('div').hasClass('urgent')).to.be.false;
    });

    it('marks tasks with a priority over 4', function () {
        scope.details.priority = 5;
        scope.$apply();
        expect(el.find('div').hasClass('urgent')).to.be.true;
    });

    it('prints the description', function () {
        expect(el.find('div').text()).to.equal(details.description);
    });

});
