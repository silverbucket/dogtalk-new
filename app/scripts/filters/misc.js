'use strict';

angular.module('dogtalkApp').
// filter('orderByMessageCount', function () {
//  return function(input, attribute) {
//     //if (!angular.isObject(input)) return input;

//     var array = [];
//     for(var objectKey in input) {
//         array.push(input[objectKey]);
//     }

//     array.sort(function (a, b) {
//         a = parseInt(a[attribute]);
//         b = parseInt(b[attribute]);
//         return a - b;
//     });
//     return array;
//  };
// }).

// filter('orderObjectBy', function () {
//   return function (items, field, reverse) {
//     var filtered = [];
//     angular.forEach(items, function (item) {
//       filtered.push(item);
//     });
//     filtered.sort(function (a, b) {
//       return (a[field] > b[field]);
//     });
//     if(reverse) filtered.reverse();
//     return filtered;
//   };
// }).

filter('filterObject', function () {
  return function (items, prop, val, reverse) {
    var filtered = [];

    angular.forEach(items, function (item) {
      if ((!val) ||
          (item[prop].toLowerCase().indexOf(val.toLowerCase()) >= 0)) {
        console.log('YES '+val);
        filtered.push(item);
      } else {
        console.log('NO: '+item.fn+ ': '+item[prop].indexOf(val));
      }
    });

    if (reverse) {
      filtered.reverse();
    }

    return filtered;
  };
});