'use strict';

angular.module('dogtalkApp.services.contacts', ['ngRemoteStorage']).

value('ContactData', {
  contacts: []
}).

run(['RS', 'ContactData',
function (RS, ContactData) {
  RS.on('contacts', 'change', function (data) {
    console.log('CHANGE EVENT: ', data);
  });
  RS.on('contacts', 'conflict', function (data) {
    console.log('CONFLICT EVENT: ', data);
  });
}]).

factory('Contact', ['RS', 'ContactData', '$q',
function (RS, ContactData, $q) {
  return {
    get: function (id) {
      return RS.call('contacts', 'get' [id]);
    },
    save: function (data) {
      return RS.call('contacts', 'save', [data]);
    },
    query: function (refresh) {
      if (refresh) {
        return RS.call('contacts', 'getAll', ['']);
      } else {
        var defer = $q.defer();
        defer.resolve(ContactData.contacts);
        return defer.promise;
      }
    },
    remove: function (id) {
      return RS.call('contacts', 'remove', [id]);
    }
  };
}]).

factory('MultipleContactLoader', ['Contact',
function (Contact) {
  return function () {
    return Contact.query();
  };
}]).

factory('ContactLoader', ['Contact', '$route',
function (Contact, $route) {
  return function() {
    return Contact.get($route.current.params.contactId);
  };
}]);