'use strict';

angular.module('dogtalkApp.services.accounts', ['ngRemoteStorage']).

value('AccountData', {
  accounts: [
    {
      'user': 'lilac',
      'host': 'irc.freenode.net',
      'port': 6689,
      'type': 'irc'
    },
    {
      'user': 'lilac@hotmail.com',
      'host': 'hotmail.com',
      'port': 1234,
      'type': 'xmpp'
    }
  ]
}).

factory('Account', ['RS', '$q', 'AccountData',
function (RS, $q, AccountData) {
  return {
    get: function (id) {
      return RS.call('accounts', 'get' [id]);
    },
    save: function (data) {
      return RS.call('accounts', 'save', [data]);
    },
    query: function (refresh) {
      if (refresh) {
        return RS.call('accounts', 'getAll', ['']);
      } else {
        var defer = $q.defer();
        defer.resolve(AccountData.accounts);
        return defer.promise;
      }
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