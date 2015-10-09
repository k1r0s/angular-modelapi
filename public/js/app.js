var testapp = angular.module('testapp', ['ngModelapi']);

testapp.controller(testapp);

testapp.testapp$controller = function($scope, rest$api, rest$model){
  rest$api.configure({
    apiRoot: '',
    model: {
      name: 'person',
      class: rest$model.configure({
        id: null,
        name: '',
        surname: '',
        age: 0,
        address: '',
        city: '',
        summary: function(){
          return this.name + ' ' + this.surname + ', ' + this.age;
        },
        somefunction: function(){
          return 'this function will be implemented in all models';
        }
      })
    }
  });

  $scope.editing = false;
  $scope.personCollection = [];

  rest$api.retrieve(function(coll){
    $scope.personCollection = coll;
  });

  $scope.done = function(id){
    $scope.editing = false;
    if(id){
      rest$api.update($scope.tmp.id, $scope.tmp, function(coll){
        $scope.personCollection = coll;
      });
    }else{
      rest$api.create($scope.tmp, function(coll){
        $scope.personCollection = coll;
      });
    }
  }

  $scope.create = function(){
    $scope.editing = true;
    $scope.tmp = rest$api.new();
  }

  $scope.edit = function(id){
    $scope.editing = true;
    $scope.tmp = $scope.personCollection[id];
  }

  $scope.cancel = function(id){
    $scope.editing = false;
    $scope.tmp = null;
  }

  $scope.delete = function(id){
    $scope.tmp = $scope.personCollection[id];
    rest$api.delete($scope.tmp.id, function(coll){
      $scope.personCollection = coll;
    });
  }
}
