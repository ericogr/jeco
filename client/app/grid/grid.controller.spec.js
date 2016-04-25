'use strict';

describe('Controller: GridCtrl', function () {

  // load the controller's module
  beforeEach(module('jecoBoardGameApp'));

  var GridCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GridCtrl = $controller('GridCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
