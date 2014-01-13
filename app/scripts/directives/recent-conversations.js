'use strict';

angular.module('dogtalkApp.directives.recentConversations', []).

directive('recentConversations', ['$rootScope',
function ($rootScope) {
  return {
    scope: {
      contacts: '=',
      messages: '=',
      search: '='
    },
    templateUrl: '/views/recent-conversations.html'
  };
}]);
