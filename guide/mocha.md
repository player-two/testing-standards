# Mocha

Mocha provides the structure for our tests; its functions allow you to build a test suite.

## Basics

`describe` and `it` are the bread and butter of your test suite.

```javascript
describe('object under test', function () {
    
    it('behaves a certain way', function () {
        // ...
    });

});
```

> Tip: Use nouns or conditionals (e.g. 'when...') in `describe` descriptions, and start `it` descriptions with a verb.


## Setup/Teardown

Use `beforeEach` to prepare for a test and `afterEach` to clean up after it.  See [ngMock.md](ngMock.md) for some examples of what goes inside `beforeEach`.  `afterEach` will not often be needed, but using [$httpBackend](https://docs.angularjs.org/api/ngMock/service/$httpBackend) is once such cirumstance.

```javascript
describe('object under test', function () {

    beforeEach(function () {
        // ...
    });

    afterEach(function () {
        // ...
    });

});
```

Mocha also provides `before` and `after`, but it's generally a good idea to avoid them as to not rely on state from a prior test.

```javascript
describe('object under test', function () {
    var scope;
    
    before(function () {
        scope.counter = 0;
    });

    it('increments the counter', function () {
        scope.counter++;
        expect(scope.counter).to.equal(1);
    });

    it('...', function () {
        // scope.counter is 1
        // this code includes a side-effect from the previous test
    });
});

```


## Nesting

The test suite is just a tree structure, so you can use that to your advantage when testing a series of circumstances.

```javascript
describe('api service', function () {
    var api;

    beforeEach(function () {
        // get the api service
    });

    describe('.save', function () {
        
        beforeEach(function () {
            api.save();
        });

        describe('when the save is successful', function () {
            it('celebrates');
        });

        describe('when the save is unsuccessful', function () {
            it('breaks everything');
        });

    });
});
```

Not only does this organize the tests better, but it creates better error messages.  A failure for the first test would print

`api service .save when the save is successful celebrates`
