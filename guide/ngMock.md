# ngMock

Used for mocking angular components

The examples on this page are purposefully incomplete; they demonstrate some of the functions for `ngMock`, but out of the context of a test suite.  For full examples, see the `src/` directory of this repo.

## Basics

> Tip: most ngMock code lives in the `beforeEach` section of your test.

In order to inject a controller or service or create a directive, the module under test must first be registered.
```javascript
module('app');

inject(function ($rootScope, myService) {
});
```

Much like the constructor function for a controller or service, the arguments of the callback function for `inject` will be retrieved from the provider.


## Controllers

ngMock provides the `$controller` service for creating controllers. It allows you to override the parameters passed to the controller's constructor function.  This is important because we do not want to test the behavior of a service in our controller's test code.  Rather, we only want to verify that the controller interacts with the service.  This can be accomplished using mocks.

```javascript
var scope, myServiceMock;

inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    $controller('MyCtrl', {
        $scope: scope,
        myService: myServiceMock
    });
});
```


## Services

Since there is no equivalent of `$controller` for services, the provider is used instead.  The service under test will be injected via the normal means.

```javascript
var myService, otherServiceMock;

module(function ($provide) {
    $provide.value('otherService', otherServiceMock);
});

inject(function (_myService_) {
    myService = _myService_;
});
```


## Directives

Though directives use mocks in the same way as services, they cannot be injected with the injector.  Instead, they must be created by compiling html.

```javascript
var scope, isolateScope, el, myService;

module(function ($provide) {
    $provide.value('myService', myServiceMock);
});

inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    el = $compile(template)(scope);
    scope.$apply();
    isolateScope = el.isolateScope();
});
```
