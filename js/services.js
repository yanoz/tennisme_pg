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
      	// $http returns a promise, which has a then function, which also returns a promise
     	var promise = $http.get('http://tennis-me.com/slots.json?auth_token=zvLgHfsSMKb8B7yjGGUj').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return getSlots;
});


