# ngMock

Used for mocking angular components

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
var scope;

var myServiceMock = {
    someMethod: sinon.stub()
};

beforeEach(function () {
    inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('MyCtrl', {
            $scope: scope,
            myService: myServiceMock
        });
    });
});

it('sets some property on the scope', function () {
    expect($scope.prop).to.equal('bar');
});

it('calls the method with foo', function () {
    expect(myServiceMock.someMethod).to.have.been.calledWith('foo');
});
```
