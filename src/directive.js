angular.module('app')
.directive('task', function (tasks) {
    return {
        restrict: 'E',
        template: '<div ng-class="{urgent: task.priority > 4}">{{ task.description }}</div>' +
                  '<button ng-click="update()"></button>',
        scope: {
            task: '=details'
        },
        link: function (scope) {
            scope.update = function () {
                tasks.save(scope.task.id);
            };
        }
    };
});
