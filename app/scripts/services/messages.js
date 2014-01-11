'use strict';

angular.module('dogtalkApp.services.messages', ['ngRemoteStorage']).

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
      'timestamp': 12345678905,
      'from': 'bobby@bobbymcferrin.com',
      'to': 'lilac@hotmail.com',
      'text': 'holla! hey!',
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
    }
  ]
}).

factory('Message', ['RS', '$q', 'MessageData',
function (RS, $q, MessageData) {
  return {
    get: function (id) {
      return RS.call('messages', 'get' [id]);
    },
    save: function (data) {
      return RS.call('messages', 'save', [data]);
    },
    query: function (refresh) {
      if (refresh) {
        return RS.call('messages', 'getAll', ['']);
      } else {
        var defer = $q.defer();
        defer.resolve(MessageData.messages);
        return defer.promise;
      }
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