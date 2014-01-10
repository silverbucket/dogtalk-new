'use strict';

angular.module('dogtalkApp.directives', []);
directives.directive('recentConversations', ['$rootScope',
function($rootScope) {
  return {
    temaplteUrl: 'views/recent-conversations.html',
    link: function(scope, element, attrs) {
      //
    }
  };
}]);
