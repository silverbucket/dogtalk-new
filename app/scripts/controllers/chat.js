'use strict';

angular.module('dogtalkApp').
controller('ChatCtrl', ['$scope', '$route', '$document', '$location', 'messages', 'accounts', 'contacts', 'contact',
function ($scope, $route, $document, $location, messages, accounts, contacts, contact) {

  function inThisConversation (m) {
    if (!$scope.contact) { return false; }
    // targets list of IDs
    var tmp = contact.email || [];
    tmp = tmp.concat(contact.impp);
    var chatIDs = [];
    for (var i = tmp.length -1; i >= 0; i--) {
      chatIDs.push(tmp[i].value);
    }

    if (chatIDs.indexOf(m.actor.address) > -1) {
      return true;
    } else if (typeof m.target.length === 'number') {
      //if (accounts.indexOf(m.actor.address) > -1) {
        for (i = m.target.length -1; i >= 0; i--) {
          if (chatIDs.indexOf(m.target[i].address) > -1) {
            return true;
          } else if (m.target[i].address === contact.fn) {
            return true;
          }
        }
      //}
    } else {
      return false;
    }
  }

  function mergeMessages() {
    var mergedMessages = [];
    for (var key in messages) {
      for (var mk in messages[key]) {
        if (inThisConversation(messages[key][mk])) {
          mergedMessages.push(messages[key][mk]);
        }
      }
    }
    return mergedMessages;
  }

  $scope.contact = contact;
  $scope.contacts = contacts;
  $scope.accounts = accounts;
  $scope.messages = messages;
  $scope.mergedMessages = mergeMessages();

  $scope.data = {
    selected: undefined,
    searchText: undefined
  };

  $scope.isMe = function (address) {
    for (var i = $scope.accounts.length -1; i >= 0; i--) {
      if (address === $scope.accounts[i].username) {
        return true;
      }
    }
    return false;
  };

  $scope.$watchCollection('messages', function (oldValue, newValue) {
    //console.log('FIRED: ', oldValue, newValue);
    $scope.mergedMessages = mergeMessages(messages);
  });

}]);
