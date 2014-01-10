'use strict';

angular.module('dogtalkApp.services.accounts', ['ngRemoteStorage']).

factory('Account', ['RS',
function (RS) {
  return {
    get: function (id) {
      return RS.call('accounts', 'get' [id]);
    },
    save: function (data) {
      return RS.call('accounts', 'save', [data]);
    },
    query: function () {
      return RS.call('accounts', 'getAll', []);
    },
    remove: function (id) {
      return RS.call('accounts', 'remove', [id]);
    }
  };
}]).

factory('MultipleAccountLoader', ['Account',
function (Account) {
  return function () {
    return Account.query();
  };
}]).

factory('AccountLoader', ['Account', '$route',
function (Account, $route) {
  return function() {
    return Account.get($route.current.params.accountId);
  };
}]);