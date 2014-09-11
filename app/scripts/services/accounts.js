'use strict';

angular.module('dogtalkApp.services.accounts', ['ngRemoteStorage']).

value('AccountData', {
  accounts: [
    {
      'name': 'irc:lilac@irc.freenode.net',
      'username': 'lilac',
      'host': 'irc.freenode.net',
      'port': 6689,
      'type': 'irc',
      'enabled': true
    },
    {
      'name': 'xmpp:lilac@hotmail.com',
      'username': 'lilac@hotmail.com',
      'host': 'hotmail.com',
      'resource': 'Home',
      'password': 'password123',
      'port': 1234,
      'type': 'xmpp',
      'enabled': true
    }
  ],
  messageHandlers: {} // remotestorage objects for accessing specific message
                      // groups for an account
}).

factory('Account', ['RS', '$q', 'AccountData',
function (RS, $q, AccountData) {
  return {
    get: function (platform, name) {
      var defer = $q.defer();
      RS.call('messages', 'getAcount', [platform, name]).then(defer.resolve,
        function () {
          for (var i = AccountData.length - 1; i >= 0; i--) {
            if (AccountData.accounts[i].name === name) {
              defer.resolve(AccountData.accounts[i]);
              return;
            }
          }
          console.log('ACCOUNT REJECT: ', name);
          defer.reject();
          return;
        }
      );
      return defer.promise;
    },
    save: function (platform, name, data) {
      return RS.call('messages', 'setAccount', [platform, name, data]).then(function () {
        return RS.call('messages', 'openMessages', [data.name]);
      }).then(function (messageHandler) {
        AccountData.messageHandlers[data.name] = messageHandler;
      });
    },
    query: function (platform, refresh) {
      if (refresh) {
        if (platform) {
          return RS.call('messages', 'getAccounts', ['']);
        } else {
          return RS.call('messages', 'getAccounts', [platform]);
        }
      } else {
        var defer = $q.defer();
        if ((platform) && (AccountData.accounts.platform)) {
          defer.resolve(AccountData.accounts.platform);
        } else {
          defer.resolve(AccountData.accounts);
        }
        return defer.promise;
      }
    },
    remove: function (id) {
      return RS.call('messages', 'remove', [id]);
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