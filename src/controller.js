angular.module('app')
.controller('ctrl', function ($scope, tasks, modal) {

    $scope.loading = true;
    tasks.getAll()
    .then(function (taskList) {
        $scope.tasks = taskList;
    })
    .catch(function () {
        $scope.errorMessage = 'Error loading tasks';
    })
    .finally(function () {
        $scope.loading = false;
    });

    $scope.getDetails = function (taskId) {
        tasks.get(taskId)
        .then(function (details) {
            modal.open(details);
        })
        .catch(function (error) {
            $scope.errorMessage = error;
        });
    };

});
