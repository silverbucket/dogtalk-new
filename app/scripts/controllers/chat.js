'use strict';

angular.module('dogtalkApp').
controller('ChatCtrl', ['$scope', '$route', '$document', '$location', 'messages', 'accounts', 'contacts', 'contact',
function ($scope, $route, $document, $location, messages, accounts, contacts, contact) {

  // $scope.data = {
  //   selected: $route.current.params.contactId || defaultId,
  //   searchText: undefined
  // };
  //
  $scope.contact = contact;
  $scope.contacts = contacts;
  $scope.accounts = accounts;
  $scope.messages = messages;

  $scope.data = {
    selected: $route.current.params.contactId || defaultId,
    searchText: undefined
  };

  $scope.isMe = function (address) {
    for (var i = $scope.accounts.length -1; i >= 0; i--) {
      if (address === $scope.accounts[i].user) {
        return true;
      }
    }
    return false;
  };


}]);
