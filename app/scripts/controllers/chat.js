'use strict';

angular.module('dogtalkApp').
controller('ChatCtrl', ['$scope', '$route', '$document', '$location', 'messages', 'accounts', 'contacts', 'contact',
function ($scope, $route, $document, $location, messages, accounts, contacts, contact) {

  function inThisConversation (m) {
    if (!$scope.contact) { return false; }
    // targets list of IDs
    var tmp = contact.email.concat(contact.impp);
    var chatIDs = [];
    for (var i = tmp.length -1; i >= 0; i--) {
      chatIDs.push(tmp[i].value);
    }
console.log('comparing chatIds: ', chatIDs);
console.log('comparing m: ', m);

    if ((chatIDs.indexOf(m.actor.address) > -1) ||
        ((chatIDs.indexOf(m.target.address) > -1) &&
         (accounts.indexOf(m.actor.address) > -1))) {
      return true;
    } else {
      return false;
    }
  }

  function mergeMessages() {
    console.log('mergeMessages() called');
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
  //$scope.mergedMessages = mergeMessages();
  //console.log('--MSGS: ', $scope.mergedMessages);
  console.log('CONTACT: ', contact);

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
    console.log('FIRED: ', oldValue, newValue);
    $scope.mergedMessages = mergeMessages(messages);
  });

}]);
