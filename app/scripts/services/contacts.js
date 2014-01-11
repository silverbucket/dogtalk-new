'use strict';

angular.module('dogtalkApp.services.contacts', ['ngRemoteStorage']).

value('ContactData', {
  contacts: [
    {
      'fn': 'Jiri Novak',
      'familyName': 'Novak',
      'givenName': 'Jiri',
      'additionalName': '',
      'honorificPrefix': '',
      'honorificSuffix': '',
      'nickname': 'jiridog',
      'url': 'google.com',
      'email': [
        {
          'type': 'home',
          'value': 'jiridog@hotmail.com'
        },
        {
          'type': 'work',
          'value': 'jnovak@killstupids.com'
        }
      ],
      'tels': [],
      'adr': '',
      'geo': '',
      'tz': '',
      'photo': '',
      'logo': '',
      'sound': '',
      'bday': '',
      'title': '',
      'role': '',
      'org': {
        'organizationName': '',
        'organizationUnit': ''
      },
      'impp': ''
    },
    {
      'fn': 'Bobby McFerrin',
      'familyName': 'McFerrin',
      'givenName': 'Bobby',
      'additionalName': '',
      'honorificPrefix': '',
      'honorificSuffix': '',
      'nickname': 'bmf',
      'url': 'bobbymcferrin.com',
      'email': [
        {
          'type': 'work',
          'value': 'bobby@bobbymcferrrin.com'
        }
      ],
      'tels': [],
      'adr': '',
      'geo': '',
      'tz': '',
      'photo': '',
      'logo': '',
      'sound': '',
      'bday': '',
      'title': '',
      'role': '',
      'org': {
        'organizationName': '',
        'organizationUnit': ''
      },
      'impp': ''
    }
  ]
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