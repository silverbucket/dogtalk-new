'use strict';

angular.module('dogtalkApp').
controller('MainCtrl', ['$scope', 'contacts', 'accounts', 'messages',
function ($scope, contacts, accounts, messages) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.search = {text: undefined};
  $scope.contacts = contacts;
  $scope.accounts = accounts;
  $scope.messages = messages;
}]);
