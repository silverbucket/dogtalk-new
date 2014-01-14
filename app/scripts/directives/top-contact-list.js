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
    controller: ['$scope', '$location', '$document', '$route', 'keyboardManager',
      function ($scope, $location, $document, $route, keyboardManager) {

        function getId(prevId, reverse, loop) {
          var first = true, next = false,id;
          var firstId;
          for (var key in $scope.contacts) {
            if (first) {
              firstId = $scope.contacts[key].id;
            }

            if (next) {
              id = $scope.contacts[key].id;
              break;
            } else if ((!prevId) && (first)) {
              id = $scope.contacts[key].id;
              break;
            } else if ($scope.contacts[key].id === prevId) {
              if (reverse) {
                return (id) ? id : firstId;
              } else if (loop) {
                id = firstId;
                next = true;
              } else {
                id = $scope.contacts[key].id;
                next = true;
              }
            } else {
              id = key;
            }
            first = false;
          }

          return (id) ? id : firstId;
        }

        var defaultId = getId();
        $scope.data.selected = $route.current.params.contactId || defaultId;

        // Bind ctrl+a
        keyboardManager.bind('ctrl+down', function() {
          $scope.data.selected = getId($scope.data.selected, false, false);
        });
        keyboardManager.bind('ctrl+up', function() {
          $scope.data.selected = getId($scope.data.selected, true, false);
        });
        keyboardManager.bind('tab', function() {
          $scope.data.selected = getId($scope.data.selected, false, true);
        });
        keyboardManager.bind('esc', function() {
          $scope.data.searchText = '';
        });
        keyboardManager.bind('enter', function() {
          $location.path('/c/' + $scope.data.selected);
        });
        keyboardManager.bind('ctrl+left', function() {
          $location.path('/dash');
        });
        // $document.bind('keypress', function (event) {
        //   console.log('keypress: ', event);
        //   if (event.key === 'Tab') {
        //     $scope.data.selected = getId($scope.data.selected, false, true);
        //     return false;
        //   } else if (event.key === 'Esc') {
        //     $scope.data.searchText = '';
        //     return false;
        //   } else if ((event.key === 'Enter') && ($scope.data.selected)) {
        //     $location.path('/c/' + $scope.data.selected);
        //     return false;
        //   }
        //   return true;
        // });
      }]
  };
}]);