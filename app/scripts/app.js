'use strict';

angular.module('dogtalkApp', [
  'ngRoute',
  'ngRemoteStorage',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts'
]).

config(['$routeProvider',
function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsCtrl'
    })

    /*
     * account routes
     */
    .when('/accounts/list', {
      templateUrl: 'views/accounts/list.html',
      controller: 'AccountListCtrl',
      resolve: {
        contacts: ['MultipleAccountLoader', function (MultipleAccountLoader) {
          return MultipleAccountLoader();
        }]
      }
    })
    .when('/accounts/edit/:accountId', {
      templateUrl: 'views/accounts/edit.html',
      controller: 'AccountEditCtrl',
      resolve: {
        accounts: function (AccountLoader) {
          return AccountLoader();
        }
      }
    })
    .when('/accounts/view/:accountId', {
      templateUrl: 'views/accounts/view.html',
      controller: 'AccountViewCtrl',
      resolve: {
        accounts: function (AccountLoader) {
          return AccountLoader();
        }
      }
    })
    .when('/accounts/new', {
      templateUrl: 'views/accounts/edit.html',
      controller: 'AccountNewCtrl'
    })

    /*
     * contact routes
     */
    .when('/contacts/list', {
      templateUrl: 'views/contacts/list.html',
      controller: 'ContactListCtrl',
      resolve: {
        contacts: function (MultipleContactLoader) {
          return MultipleContactLoader();
        }
      }
    })
    .when('/contacts/edit/:contactId', {
      templateUrl: 'views/contacts/edit.html',
      controller: 'ContactEditCtrl',
      resolve: {
        contacts: function (ContactLoader) {
          return ContactLoader();
        }
      }
    })
    .when('/contacts/view/:contactId', {
      templateUrl: 'views/contacts/view.html',
      controller: 'ContactViewCtrl',
      resolve: {
        contacts: function (ContactLoader) {
          return ContactLoader();
        }
      }
    })
    .when('/contacts/new', {
      templateUrl: 'views/contacts/edit.html',
      controller: 'ContactNewCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });
}]);
