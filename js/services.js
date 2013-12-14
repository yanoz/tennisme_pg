'use strict';

/* Services */

// Simple value service.
angular.module('tennisme.services', []).
  value('version', '0.1');


// phonegap ready service - listens to deviceready
tennisme.factory('phonegapReady', function() {
    return function (fn) {
        var queue = [];
        var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
    };
              
    document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
            fn.apply(this, args);
        });
        impl = fn;
    }, false);
              
    return function () {
        return impl.apply(this, arguments);
        };
    };
});

tennisme.factory('getSlots', function($http) {
  var getSlots = {
    async: function() {
    	$http.defaults.useXDomain = true;
     	var promise = $http.get('http://tennis-me.com/slots.json?auth_token=zvLgHfsSMKb8B7yjGGUj').then(function (response) {
        return response.data;
      });
      
      return promise;
    }
  };
  return getSlots;
});

tennisme.factory('printer', function() {
    return {
        printSlots: function(data) {
            var rawData = angular.fromJson(data);
            var slots = {};
            angular.forEach(rawData, function(value, key){
              alert(value.date);
              // var slotDate = Date.parseExact(value.date, "yyyy-MM-dd");
              // slots[key] = value;
              // slots[key].slotDate=slotDate.getDate();
              // if (key == 0) {
              //   slots[key].slotDay="Aujourd\'hui (".concat(weekday[slotDate.getDay()], ")");
              // } else if (key == 1) {
              //   slots[key].slotDay="Demain (".concat(weekday[slotDate.getDay()], ")");
              // } else {
              //   slots[key].slotDay=weekday[slotDate.getDay()];
              // }   
              // slots[key].slotMonth=month[slotDate.getMonth()];
              // slots[key].formatedDate = weekday[slotDate.getDay()].concat(' ', slots[key].slotDate, ' ', slots[key].slotMonth);
            });
            return data;
        }
    };
});

tennisme.factory('getProfile', function($http) {
  var getProfile = {
    async: function() {
      $http.defaults.useXDomain = true;
        // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('http://tennis-me.com/account.json?auth_token=zvLgHfsSMKb8B7yjGGUj').then(function (response) {
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return getProfile;
});




