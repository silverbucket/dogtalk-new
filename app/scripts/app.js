'use strict';

angular.module('dogtalkApp', [
  'ngRoute',
  'ngRemoteStorage',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts',
  'dogtalkApp.services.messages'
]).


/**
 * remotestorage config
 */
run(['RemoteStorageConfig',
function (RScfg) {
  RScfg.modules = [
    ['sockethub', 'rw', {'cache': true, 'public': false}],
    ['contacts', 'rw', {'cache': true, 'public': false}],
    ['messages', 'rw', {'cache': true, 'public': false}]
  ];
}]).


config(['$routeProvider',
function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        messages: ['MultipleMessageLoader', function (MultipleMessageLoader) {
          return MultipleMessageLoader();
        }],
        accounts: ['MultipleAccountLoader', function (MultipleAccountLoader) {
          return MultipleAccountLoader();
        }],
        contacts: ['MultipleContactLoader', function (MultipleContactLoader) {
          return MultipleContactLoader();
        }]
      }
    })



    /*
     * settings routes
     */
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
        accounts: ['MultipleAccountLoader', function (MultipleAccountLoader) {
          return MultipleAccountLoader();
        }]
      }
    })
    .when('/accounts/edit/:accountId', {
      templateUrl: 'views/accounts/edit.html',
      controller: 'AccountEditCtrl',
      resolve: {
        accounts: ['AccountLoader', function (AccountLoader) {
          return AccountLoader();
        }]
      }
    })
    .when('/accounts/view/:accountId', {
      templateUrl: 'views/accounts/view.html',
      controller: 'AccountViewCtrl',
      resolve: {
        accounts: ['AccountLoader', function (AccountLoader) {
          return AccountLoader();
        }]
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
        contacts: ['MultipleContactLoader', function (MultipleContactLoader) {
          return MultipleContactLoader();
        }]
      }
    })
    .when('/contacts/edit/:contactId', {
      templateUrl: 'views/contacts/edit.html',
      controller: 'ContactEditCtrl',
      resolve: {
        contacts: ['ContactLoader', function (ContactLoader) {
          return ContactLoader();
        }]
      }
    })
    .when('/contacts/view/:contactId', {
      templateUrl: 'views/contacts/view.html',
      controller: 'ContactViewCtrl',
      resolve: {
        contacts: ['ContactLoader', function (ContactLoader) {
          return ContactLoader();
        }]
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
