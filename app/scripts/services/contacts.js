'use strict';

angular.module('dogtalkApp.services.contacts', ['ngRemoteStorage']).

value('ContactData', {
  contacts: {
    '123456': {
      'id': '123456',
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
      'impp': [
        {
          'type': 'xmpp',
          'value': 'jiridog@hotmail.com'
        },
        {
          'type': 'xmpp',
          'value': 'jnovak@killstupids.com'
        }
      ]
    },

    '654321': {
      'id': '654321',
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
          'value': 'bobby@bobbymcferrin.com'
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
      'impp': [
        {
          'type': 'xmpp',
          'value': 'bobby@bobbymcferrin.com'
        },
        {
          'type': 'irc',
          'value': 'bmf'
        }
      ]
    }
  }
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
      var defer = $q.defer();
      if (typeof ContactData.contacts[id] === 'object') {
        defer.resolve(ContactData.contacts[id]);
      } else {
        RS.call('contacts', 'get', [id]).then(function (contact) {
          ContactData.contacts[contact.id] = contact;
          defer.resolve(contact);
        }, function (e) {
          defer.reject(e);
        });
      }
      return defer.promise;
    },
    save: function (data) {
      ContactData.contacts[data.id] = data;
      return RS.call('contacts', 'save', [data]);
    },
    query: function (refresh) {
      var defer = $q.defer();
      if (refresh) {
        RS.call('contacts', 'get', [id]).then(function (contactArray) {
          for (var i = contactArray.length - 1; i >= 0; i--) {
            ContactData.contacts[contactArray[i].id] = contactArray[i];
          }
          defer.resolve(ContactData.contacts);
        }, function (e) {
          defer.reject(e);
        });
      } else {
        defer.resolve(ContactData.contacts);
      }
      return defer.promise;
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