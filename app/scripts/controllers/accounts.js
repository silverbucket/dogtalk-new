'use strict';

angular.module('dogtalkApp').

controller('AccountListCtrl', ['$scope', 'accounts',
function ($scope, accounts) {
console.log('YARG!');
  $scope.accounts = accounts;
}]).

controller('AccountViewCtrl', ['$scope', '$location', 'account',
function ($scope, $location, account) {
  $scope.account = account;

  $scope.edit = function () {
    $location.path('/account/edit/' + account.id);
  };

}]).

controller('AccountEditCtrl', ['$scope', '$location', 'account', 'Account',
function ($scope, $location, account, Account) {
  $scope.account = account;

  $scope.save = function() {
    Account.save($scope.account).then(function () {
      $location.path('/view/' + $scope.account.id);
    });
  };

  $scope.remove = function() {
    Account.delete($scope.account).then(function () {
      delete $scope.account;
      $location.path('/');
    }, function (err) {
      delete $scope.account;
      $location.path('/');
    });
  };
}]).

controller('AccountNewCtrl', ['$scope', '$location', 'Account',
function ($scope, $location, Account) {
  $scope.account = new Account();

  $scope.save = function() {
    Account.save($scope.account).then(function () {
      $location.path('/view/' + $scope.account.id);
    });
  };

// }]).

// app.controller('IngredientsCtrl', ['$scope', function($scope) {
//   $scope.addIngredient = function() {
//   var ingredients = $scope.recipe.ingredients;
//   ingredients[ingredients.length] = {};
//   };
//   $scope.removeIngredient = function(index) {
//   $scope.recipe.ingredients.splice(index, 1);
//   };
}]);
