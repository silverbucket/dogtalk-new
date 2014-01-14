'use strict';

angular.module('dogtalkApp.directives.topContactList', []).

directive('topContactList', ['$rootScope',
function ($rootScope) {


  return {
    scope: {
      contacts: '=',
      data: '='
    },
    templateUrl: 'views/top-contact-list.html',
    controller: ['$scope', '$location', '$document', '$route',
      function ($scope, $location, $document, $route) {
console.log('contacts: ', $scope.contacts);
console.log('data: ', $scope.data);

        function getId(prevId, reverse) {
          var first = true, next = false,id;
          for (var key in $scope.contacts) {
            if (next) {
              id = $scope.contacts[key].id;
              break;
            } else if ((!prevId) && (first)) {
              id = $scope.contacts[key].id;
              break;
            } else if ($scope.contacts[key].id === prevId) {
              if (reverse) {
                return id;
              } else {
                id = $scope.contacts[key].id;
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
        $scope.data.selected = $route.current.params.contactId || defaultId;
        $document.bind('keypress', function (event) {
          console.log('keypress: ', event);
          if (event.key === 'Up') {
            $scope.data.selected = getId($scope.data.selected, true);
          } else if (event.key === 'Down') {
            $scope.data.selected = getId($scope.data.selected, false);
          } else if (event.key === 'Esc') {
            $scope.data.searchText = '';
          } else if ((event.key === 'Enter') && ($scope.data.selected)) {
            $location.path('/c/' + $scope.data.selected);
          }
          return true;
        });
      }]
  };
}]);