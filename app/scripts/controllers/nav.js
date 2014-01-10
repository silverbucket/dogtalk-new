'use strict';

angular.module('dogtalkApp')
  .controller('NavCtrl', ['$scope', '$location',
  function ($scope, $location) {
    /**
     * Sets the `active` class if the given `page` (parameter) is, indeed, active.
     *
     * @param {string} name of page
     * @return {string} `active` or an empty string
     */
    $scope.class = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };
  }]);
