describe('app controller: ctrl', function () {
    var scope, getAllDeferred, getDeferred;

    var tasksMock = {
        getAll: sinon.stub(),
        get: sinon.stub()
    };

    var modalMock = {
        open: sinon.stub()
    };

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, $q, $controller) {
            scope = $rootScope.$new();

            getAllDeferred = $q.defer();
            getDeferred = $q.defer();
            tasksMock.getAll.returns(getAllDeferred.promise);
            tasksMock.get.returns(getDeferred.promise);

            $controller('ctrl', {
                $scope: scope,
                tasks: tasksMock,
                modal: modalMock
            });
        });
    });

    describe('fetching the tasks', function () {

        it('enters a loading state', function () {
            expect(scope.loading).to.be.true;
        });

        it('loads all the tasks', function () {
            expect(tasksMock.getAll).to.have.been.called;
        });

        it('writes the tasks to the scope when successful', function () {
            var tasks = ['task-1', 'task-2'];
            getAllDeferred.resolve(tasks);
            scope.$apply();
            expect(scope.tasks).to.equal(tasks);
            expect(scope.loading).to.be.false;
        });

        it('shows an error when the request fails', function () {
            getAllDeferred.reject();
            scope.$apply();
            expect(scope.errorMessage).to.equal('Error loading tasks');
            expect(scope.loading).to.be.false;
        });

    });

    describe('.getDetails', function () {

        beforeEach(function () {
            scope.getDetails(1);
        });

        it('loads the task details by id', function () {
            expect(tasksMock.get).to.have.been.calledWith(1);
        });

        it('opens a modal with the task details when successful', function () {
            var details = {
                id: 1,
                description: 'Something you must do.'
            };
            getDeferred.resolve(details);
            scope.$apply();
            expect(modalMock.open).to.have.been.calledWith(details);
        });

        it('passes the error through on failure', function () {
            var errorMessage = 'That task has been corrupted.'
            getDeferred.reject(errorMessage);
            scope.$apply();
            expect(scope.errorMessage).to.equal(errorMessage);
        });

    });
});
