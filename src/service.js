angular.module('app')
.factory('tasks', function ($http) {

    var tasks = {
        get: function (id) {
            $http.get('/tasks/' + id);
        }
    };

    return tasks;
});
