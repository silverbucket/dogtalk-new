'use strict';

angular.module('dogtalkApp', [
  'ngRoute',
  'ngRemoteStorage',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts',
  'dogtalkApp.services.messages',
  'dogtalkApp.directives.recentConversations'
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
     * chat routes
     */
    .when('/c/:contactId', {
      templateUrl: 'views/chat.html',
      controller: 'ChatCtrl'
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
        account: ['AccountLoader', function (AccountLoader) {
          return AccountLoader();
        }]
      }
    })
    .when('/accounts/view/:accountId', {
      templateUrl: 'views/accounts/view.html',
      controller: 'AccountViewCtrl',
      resolve: {
        account: ['AccountLoader', function (AccountLoader) {
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
          return MultipleContactLoader(true);
        }]
      }
    })
    .when('/contacts/edit/:contactId', {
      templateUrl: 'views/contacts/edit.html',
      controller: 'ContactEditCtrl',
      resolve: {
        contact: ['ContactLoader', function (ContactLoader) {
          return ContactLoader();
        }]
      }
    })
    .when('/contacts/view/:contactId', {
      templateUrl: 'views/contacts/view.html',
      controller: 'ContactViewCtrl',
      resolve: {
        contact: ['ContactLoader', function (ContactLoader) {
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
