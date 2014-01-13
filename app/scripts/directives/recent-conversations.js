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
  };
}]);
