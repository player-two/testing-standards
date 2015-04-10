describe('app service: tasks', function () {
    var httpBackend, tasks;

    beforeEach(function () {
        module('app');

        inject(function ($httpBackend, _tasks_) {
            httpBackend = $httpBackend;
            tasks = _tasks_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('.get', function () {

        it('loads a task using the id', function () {
            httpBackend.expectGET('/tasks/0').respond(200);
            tasks.get(0);
            httpBackend.flush();
        });

    });

});
