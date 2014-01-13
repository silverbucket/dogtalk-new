'use strict';

angular.module('dogtalkApp').
controller('DashCtrl', ['$scope', 'contacts', 'accounts', 'messages', '$route', '$document',
function ($scope, contacts, accounts, messages, $route, $document) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  function getId(prevId, reverse) {
    var first = true,
        next = false,
        id;
    for (var key in contacts) {
      if (next) {
        id = contacts[key].id;
        break;
      } else if ((!prevId) && (first)) {
        id = contacts[key].id;
        break;
      } else if (contacts[key].id === prevId) {
        if (reverse) {
          return id;
        } else {
          id = contacts[key].id;
          next = true;
        }
      } else {
        id = key;
      }
      first = false;
    }
    return id;
  }
  var defaultId = getId();

  $scope.data = {
    selected: $route.current.params.contactId || defaultId,
    searchText: undefined
  };

  $document.bind('keypress', function (event) {
    var reverse = (event.key === 'Down') ? false : true;

    $scope.data.selected = getId($scope.data.selected, reverse);
  });

  $scope.contacts = contacts;
  $scope.accounts = accounts;
  $scope.messages = messages;
}]);
