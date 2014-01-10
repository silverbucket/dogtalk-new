'use strict';

angular.module('dogtalkApp').

controller('ListContactsCtrl', ['$scope', 'contacts',
function ($scope, contacts) {
  $scope.contacts = contacts;
}]).

controller('ViewContactCtrl', ['$scope', '$location', 'contact',
function ($scope, $location, contact) {
  $scope.contact = contact;

  $scope.edit = function () {
    $location.path('/contact/edit/' + contact.id);
  };

}]).

controller('EditContactCtrl', ['$scope', '$location', 'contact', 'Contact',
function ($scope, $location, contact, Contact) {
  $scope.contact = contact;

  $scope.save = function() {
    Contact.save($scope.contact).then(function () {
      $location.path('/view/' + $scope.contact.id);
    });
  };

  $scope.remove = function() {
    Contact.delete($scope.contact).then(function () {
      delete $scope.contact;
      $location.path('/');
    }, function (err) {
      delete $scope.contact;
      $location.path('/');
    });
  };
}]).

controller('NewContactCtrl', ['$scope', '$location', 'Contact',
function ($scope, $location, Contact) {
  $scope.contact = new Contact();

  $scope.save = function() {
    Contact.save($scope.contact).then(function () {
      $location.path('/view/' + $scope.contact.id);
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
