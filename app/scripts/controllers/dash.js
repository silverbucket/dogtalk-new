'use strict';

angular.module('dogtalkApp').
controller('DashCtrl', ['$scope', 'contacts', 'accounts', 'messages', '$route', '$document', '$location',
function ($scope, contacts, accounts, messages, $route, $document, $location) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  $scope.data = {
    selected: undefined,
    searchText: undefined
  };

  $scope.contacts = contacts;
  $scope.accounts = accounts;
  $scope.messages = messages;
}]);