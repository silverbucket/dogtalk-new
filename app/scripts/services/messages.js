'use strict';

angular.module('dogtalkApp.services.messages', [
  'ngRemoteStorage',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts'
]).

value('MessageData', {
  messages: {},
  // TODO
  // handle IRC rooms correctly
  // - targets would be rooms, not people
  // - param wouldn't be contactId anymore, but room/group identifier
  // - chat controller must properly account for and filter these messages
  dummy: {
    'irc:lilac': {
      '123456789098': {
        'actor': {address:'rmsw'},
        'target': [{name: 'Lilac Johnston', address: 'lilac'}],
        'platform': 'irc',
        'object': {
          'text': 'yarg!',
          'timestamp': 12345678908,
        }
      },
      '123456789097': {
        'actor': {address:'bob'},
        'target': [{name: 'Lilac Johnston', address: 'lilac'}],
        'platform': 'irc',
        'object': {
          'text': 'HEY THERE!',
          'timestamp': 12345678908
        }
      },
      '123456789096': {
        'actor': {address:'rmsw'},
        'target': [{address:'bob'}],
        'platform': 'irc',
        'object': {
          'text': 'ssssh!',
          'timestamp': 123456789081
        }
      },
      '123456789095': {
        'actor': {address:'bob'},
        'platform': 'irc',
        'target': [{name: 'Lilac Johnston', address: 'lilac'}],
        'object': {
          'text': 'howre you?!',
          'timestamp': 12345678909
        }
      },
      '123456789094': {
        'actor': {address:'lilac'},
        'target': [{address:'bob'}],
        'platform': 'irc',
        'object': {
          'text': 'fine',
          'timestamp': 12345678908
        }
      },
      '123456789093': {
        'actor': {address:'lilac'},
        'target': [{address:'rmsw'}],
        'platform': 'irc',
        'object': {
          'text': ':P',
          'timestamp': 12345678908
        }
      },
      '123456789092': {
        'actor': {address:'rmsw'},
        'target': [{name: 'Lilac Johnston', address: 'lilac'}],
        'platform': 'irc',
        'object': {
          'text': ':D',
          'timestamp': 1234567801
        }
      },
      '123456789091': {
        'actor': {address:'jiridog'},
        'target': [{name: 'Lilac Johnston', address: 'lilac'}],
        'platform': 'irc',
        'object': {
          'text': 'watermelon 100% for real',
          'timestamp': 12345678908
        }
      }
    },
    'xmpp:lilac@hotmail.com': {
      '1234567890211': {
        'actor': {address: 'bobby@bobbymcferrin.com'},
        'target': [{name: 'Lilac Johnston', address: 'lilac@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'foo bar says baz bot',
          'timestamp': 12345678901
        }
      },
      '1234567890210': {
        'actor': {name: 'Lilac Johnston', address: 'lilac@hotmail.com'},
        'target': [{address: 'bobby@bobbymcferrin.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12345678901,
          'text': 'thats right, i forgot about that, thanks for reminding me.'
        }
      },
      '1234567890127': {
        'actor': {address: 'bobby@bobbymcferrin.com'},
        'target': [{name: 'Lilac Johnston', address: 'lilac@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'holla! hey! asfd sd sd ds dssldskjrslsekj selesls 3 lsflslselssf  se s 3 3s se fe fse fselselsefkjlskdjf vvdsvd sd sd slsdfljgs ew e slsflfsdkjse  s sflsdlkeskeskfs sdf sese fs sf.',
          'timestamp': 12345678905
        }
      },
      '1234567890126': {
        'actor': {address: 'bobby@bobbymcferrin.com'},
        'target': [{name: 'Lilac Johnston', address: 'lilac@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'lorem ipsum stuff n heimer',
          'timestamp': 12345678903
        }
      },
      '1234567890125': {
        'actor': {address: 'bobby@bobbymcferrin.com'},
        'target': [{name: 'Lilac Johnston', address: 'lilac@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'asdf asd asff asfasf',
          'timestamp': 12345678900
        }
      },
      '1234567890124': {
        'actor': {address:'rmsw@example.in'},
        'target': [{address:'jnovak@killstupids.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'lalala!',
          'timestamp': 12345678908
        }
      },
      '1234567890123': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address:'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890122': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address:'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890121': {
        'actor': {address: 'jiridog@hotmail.com'},
        'target': [{address:'lilac@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'blah'
        }
      },
      '1234567890120': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'yarg'
        }
      },
      '1234567890119': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890118': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890117': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890116': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'timestamp': 12344678908,
          'text': 'lorem ipsum'
        }
      },
      '1234567890115': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
      },
      '1234567890114': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'lorem ipsum',
          'timestamp': 12344678908,
        }
      },
      '1234567890113': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'lorem ipsum',
          'timestamp': 12344678908
        }
      },
      '1234567890112': {
        'actor': {address:'lilac@hotmail.com'},
        'target': [{address: 'jiridog@hotmail.com'}],
        'platform': 'xmpp',
        'object': {
          'text': 'lorem ipsum',
          'timestamp': 12344678908
        }
      }
    }
  }
}).

factory('Message', ['RS', '$q', 'MessageData', '$route', 'ContactLoader', 'MultipleAccountLoader',
function (RS, $q, MessageData, $route, ContactLoader, MultipleAccountLoader) {

  function getMessagesForAccount(account, refresh) {
    var defer = $q.defer();

    if ((refresh) ||
        (typeof MessageData.messages[account] === 'undefined') ||
        (Object.keys(MessageData.messages[account]).length === 0)) {

      RS.call('messages', 'account', [account]).then(function (messages) {
        for (var i = messages.length - 1; i >= 0; i--) {
          MessageData.messages[account][messages[i].messageId] = messages[i];
        }

        if ((typeof MessageData.messages[account] === 'undefined') &&
            (typeof MessageData.dummy[account] !== 'undefined')) {
          MessageData.messages[account] = MessageData.dummy[account];
        }
        defer.resolve();
      }, defer.reject);

    } else {
      defer.resolve();
    }

    return defer.promise;
  }

  return {
    get: function (id) {
      return RS.call('messages', 'get', [id]);
    },
    save: function (data) {
      return RS.call('messages', 'save', [data]);
    },
    query: function (refresh) {
      var defer = $q.defer();

      MultipleAccountLoader().then(function (accounts) {
        var count = accounts.length - 1;
        for (var i = accounts.length - 1; i >= 0; i--) {
          // open the account message group
          getMessagesForAccount(accounts[i].name, refresh).then(function () {
            if (count === 0) {
              defer.resolve(MessageData.messages);
            } else {
              count = count - 1;
            }
          });
        }
      });

      return defer.promise;
    },
    remove: function (id) {
      return RS.call('messages', 'remove', [id]);
    }
  };
}]).

factory('MultipleMessageLoader', ['Message',
function (Message) {
  return function () {
    return Message.query();
  };
}]).

factory('MessageLoader', ['Message', '$route',
function (Message, $route) {
  return function() {
    return Message.get($route.current.params.messageId);
  };
}]);