'use strict';

/* Services */

// Simple value service.
angular.module('tennisme.services', []).
  value('version', '0.1');


// phonegap ready service - listens to deviceready
tennisme.factory('cordovaReady', function() {
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

// tennisme.factory('geolocation', function ($rootScope, phonegapReady) {
//   return {
//     getCurrentPosition: function (onSuccess, onError, options) {
//         navigator.geolocation.getCurrentPosition(function () {
//                var that = this,
//                args = arguments;

//                if (onSuccess) {
//                    $rootScope.$apply(function () {
//                         onSuccess.apply(that, args);
//                    });
//                    }
//                }, function () {
//                     var that = this,
//                     args = arguments;

//                    if (onError) {
//                         $rootScope.$apply(function () {
//                             onError.apply(that, args);
//                         });
//                    }
//                },
//             options);
//         }
//     };
// });

tennisme.factory('geolocation', function ($rootScope,cordovaReady, $q) {
    return {
        getCurrentPosition: function (onSuccess, onError, options) {

            navigator.geolocation.getCurrentPosition(function () {
                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                    args = arguments;
                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            }, options);
        },
        getCurrentCity: function (onSuccess, onError, options) {
          var deferred = $q.defer(); 
          this.getCurrentPosition(function (position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode(options,function (results, status) {
              var city = address_component.long_name;
              $rootScope.$apply(function(){
                deferred.resolve(city);
              });
            });
        });
        return deferred.promise;
    }
  }
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
  var weekday = new Array(7);
  weekday[0]="Dimanche";
  weekday[1]="Lundi";
  weekday[2]="Mardi";
  weekday[3]="Mercredi";
  weekday[4]="Jeudi";
  weekday[5]="Vendredi";
  weekday[6]="Samedi";

  var month=new Array();
  month[0]="Janvier";
  month[1]="Fevrier";
  month[2]="Mars";
  month[3]="Avril";
  month[4]="Mai";
  month[5]="Juin";
  month[6]="Juillet";
  month[7]="Aout";
  month[8]="Septembre";
  month[9]="Octobre";
  month[10]="Novembre";
  month[11]="Decembre";

return {
        printSlots: function(data) {
            var rawData = angular.fromJson(data);
            var slots = {};
            angular.forEach(rawData, function(value, key){
              var slotDate = Date.parseExact(value.date, "yyyy-MM-dd");
              slots[key]=value;
              slots[key].usDate = value.date;
              slots[key].slotDate=slotDate.getDate();
              if (key == 0) {
                slots[key].slotDay="Aujourd\'hui (".concat(weekday[slotDate.getDay()], ")");
              } else if (key == 1) {
                slots[key].slotDay="Demain (".concat(weekday[slotDate.getDay()], ")");
              } else {
                slots[key].slotDay=weekday[slotDate.getDay()];
              }   
              slots[key].slotMonth=month[slotDate.getMonth()];
              slots[key].formatedDate = weekday[slotDate.getDay()].concat(' ', slots[key].slotDate, ' ', slots[key].slotMonth);
            });
            return slots;
        },
        printAddress: function(data) {

          var geocoder = new google.maps.Geocoder();
          var latitude = data.coords.latitude;
          var longitude = data.coords.longitude;
          var latlng = new google.maps.LatLng(latitude,longitude);
          var address = "";
          
          geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                address = results[0].formatted_address;
              } else {
                alert("No results found");
              }
            } else {
              alert("Geolocation failed due to: " + status);
            } 
            return address;
          });  
        },
        printSlotDate: function(date) {
          var slotDate = Date.parseExact(date, "yyyy-MM-dd");
          var printableDate = weekday[slotDate.getDay()].concat(' ', slotDate.getDate(), ' ', month[slotDate.getMonth()], ' ', slotDate.getFullYear());
          return printableDate;
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




