'use strict';

angular.module('dogtalkApp.directives.recentConversations', []).

directive('recentConversations', ['$rootScope',
function ($rootScope) {
  return {
    scope: {
      contacts: '=',
      messages: '='
    },
    templateUrl: '/views/recent-conversations.html'
    // link: function(scope, element, attrs) {
    //   console.log('---!!!', scope.contacts);
    // }
  };
}]);
