'use strict';

angular.module('dogtalkApp', [
  'ngRoute',
  'ngRemoteStorage',
  'ngSockethubClient',
  'ngSockethubRemoteStorage',
  'ngMessages',
  'dogtalkApp.services.contacts',
  'dogtalkApp.services.accounts',
  'dogtalkApp.services.messages',
  'dogtalkApp.directives.recentConversations',
  'dogtalkApp.directives.topContactList'
]).


/**
 * remotestorage config
 */
run(['RemoteStorageConfig',
function (RScfg) {
  RScfg.modules = [
    ['sockethub-credentials', 'rw', {'cache': true, 'public': false}],
    ['contacts', 'rw', {'cache': true, 'public': false}],
    ['messages', 'rw', {'cache': true, 'public': false}]
  ];
}]).

/**
 * get sockethub settings and try to connect
 */
run(['SockethubBootstrap',
function (SockethubBootstrap) {
  SockethubBootstrap.run('dogfeed', {
    // default connection settings, if none found in remoteStorage
    host: 'localhost',
    port: '10550',
    path: '/sockethub',
    tls: false,
    secret: '1234567890'
  },
  {
    logo: 'images/sockethub-logo.svg'
  });
}]).

run([function () {
  // TODO
  // this should be executed when we know the appropriate dom elements are
  // loaded.
  // right now if someone *starts* on the settings page, this will be executed
  // and wont bind to anything as the contacts view was not registered.
  setTimeout(function () {
    $(document).ready(function() {
      $('[data-toggle=offcanvas]').click(function() {
        $('.opposite-sidebar').toggleClass('active');
      });
    });
  }, 1000);
}]).

config(['$routeProvider',
function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'views/dash.html',
      controller: 'DashCtrl',
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
     * dashboard selections
     */
    .when('/dash/:contactId', {
      templateUrl: 'views/dash.html',
      controller: 'DashCtrl',
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
     * chat routes
     */
    .when('/c/:contactId', {
      templateUrl: 'views/chat.html',
      controller: 'ChatCtrl',
      resolve: {
        contact: ['ContactLoader', function (ContactLoader) {
          return ContactLoader();
        }],
        contacts: ['MultipleContactLoader', function (MultipleContactLoader) {
          return MultipleContactLoader();
        }],
        messages: ['MultipleMessageLoader', function (MultipleMessageLoader) {
          return MultipleMessageLoader();
        }],
        accounts: ['MultipleAccountLoader', function (MultipleAccountLoader) {
          return MultipleAccountLoader();
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
     * sockethub settings routes
     */
    .when('/settings/sockethub', {
      templateUrl: 'views/settings-sockethub.html'
    })

    /*
     * sockethub settings routes
     */
    .when('/test', {
      templateUrl: 'views/test2.html'
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
