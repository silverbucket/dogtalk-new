'use strict';

angular.module('dogtalkApp.services.messages', [
  'ngRemoteStorage',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts'
]).

value('MessageData', {
  messages: [
    {
      'timestamp': 12345678908,
      'from': 'rmsw',
      'to': 'lilac',
      'text': 'yarg!',
    },
    {
      'timestamp': 12345678901,
      'from': 'bobby@bobbymcferrin.com',
      'to': 'lilac@hotmail.com',
      'text': 'foo bar says baz bot',
    },
    {
      'timestamp': 12345678901,
      'from': 'lilac@hotmail.com',
      'to': 'bobby@bobbymcferrin.com',
      'text': 'thats right, i forgot about that, thanks for reminding me.',
    },
    {
      'timestamp': 12345678905,
      'from': 'bobby@bobbymcferrin.com',
      'to': 'lilac@hotmail.com',
      'text': 'holla! hey! asfd sd sd ds dssldskjrslsekj selesls 3 lsflslselssf  se s 3 3s se fe fse fselselsefkjlskdjf vvdsvd sd sd slsdfljgs ew e slsflfsdkjse  s sflsdlkeskeskfs sdf sese fs sf.',
    },
    {
      'timestamp': 12345678903,
      'from': 'bobby@bobbymcferrin.com',
      'to': 'lilac@hotmail.com',
      'text': 'lorem ipsum stuff n heimer',
    },
    {
      'timestamp': 12345678900,
      'from': 'bobby@bobbymcferrin.com',
      'to': 'lilac@hotmail.com',
      'text': 'asdf asd asff asfasf',
    },
    {
      'timestamp': 12345678908,
      'from': 'bob',
      'to': 'lilac',
      'text': 'HEY THERE!',
    },
    {
      'timestamp': 123456789081,
      'from': 'rmsw',
      'to': 'bob',
      'text': 'ssssh!',
    },
    {
      'timestamp': 12345678909,
      'from': 'bob',
      'to': 'lilac',
      'text': 'howre you?!',
    },
    {
      'timestamp': 12345678908,
      'from': 'lilac',
      'to': 'bob',
      'text': 'fine',
    },
    {
      'timestamp': 12345678908,
      'from': 'lilac',
      'to': 'rmsw',
      'text': ':P',
    },
    {
      'timestamp': 12345678908,
      'from': 'rmsw',
      'to': 'lilac',
      'text': ':D',
    },
    {
      'timestamp': 12345678908,
      'from': 'jiridog@hotmail.com',
      'to': 'lilac',
      'text': 'watermelon 100% for real',
    },
    {
      'timestamp': 12345678918,
      'from': 'jnovak@killstupids.com',
      'to': 'rmsw@example.in',
      'text': 'Mr. Watermelon will arrive at 100%',
    },
    {
      'timestamp': 12344678908,
      'from': 'lilac@hotmail.com',
      'to': 'jiridog@hotmail.com',
      'text': 'true dat',
    },
    {
      'timestamp': 12345678908,
      'from': 'rmsw@example.in',
      'to': 'jnovak@killstupids.com',
      'text': 'acceptable!',
    }
  ]
}).

factory('Message', ['RS', '$q', 'MessageData', '$route', 'ContactLoader', 'MultipleAccountLoader',
function (RS, $q, MessageData, $route, ContactLoader, MultipleAccountLoader) {

  function __filter (messages) {
    var defer = $q.defer();
    var m = [];
    if ($route.current.params.contactId) {
      var accounts;
      MultipleAccountLoader().then(function (a) {
        // users accounts
        accounts = [];
        for (var i = a.length -1; i >= 0; i--) {
          accounts.push(a[i].user);
        }
        return ContactLoader();
      }).then(function (contact) {
        // targets list of IDs
        var tmp = contact.email.concat(contact.impp);
        var chatIDs = [];
        for (var i = tmp.length -1; i >= 0; i--) {
          chatIDs.push(tmp[i].value);
        }

        for (i = messages.length -1; i >= 0; i--) {
          if ((chatIDs.indexOf(messages[i].from) > -1) ||
              ((chatIDs.indexOf(messages[i].to) > -1) &&
               (accounts.indexOf(messages[i].from) > -1))) {
            m.push(messages[i]);
          }
        }
        defer.resolve(m);
      });
    } else {
      defer.resolve(messages);
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
      if (refresh) {
        RS.call('messages', 'getAll', ['']).then(function (messages) {
          MessageData.messages = messages;
          return __filter(messages);
        }).then(function (m) {
          defer.resolve(m);
        }, defer.reject);
      } else {
        __filter(MessageData.messages).then(function (m) {
          defer.resolve(m);
        });
      }
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