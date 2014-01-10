'use strict';

angular.module('dogtalkApp.services.contacts', ['ngRemoteStorage']).

factory('Contact', ['RS',
function (RS) {
  return {
    get: function (id) {
      return RS.call('contacts', 'get' [id]);
    },
    save: function (data) {
      return RS.call('contacts', 'save', [data]);
    },
    query: function () {
      return RS.call('contacts', 'getAll', []);
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