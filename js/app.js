var app = angular.module('tennis-me', ['']);

app.factory('cordovaReady', function() {
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

app.factory('facebook', function ($rootScope, cordovaReady) {
  
   FB.init({
   	appId: '559892864037339',
    nativeInterface: CDV.FB,
    useCachedDialogs: false
   });
      
   sAuth.watchAuthenticationStatusChange();
});

app.factory('sAuth', function ($rootScope) {
    return {  	
		watchLoginChange = function() {
			var _self = this;
			FB.Event.subscribe('auth.authResponseChange', function(response) {
				if (response.status === 'connected') {			
					/* 
			 		The user is already logged, 
					 is possible retrieve his personal info
					*/
					_self.getUserInfo();
					/*
					 This is also the point where you should create a 
			 		session for the current user.
			 		For this purpose you can use the data inside the 
			 		response.authResponse object.
					*/
				} 
				else {
					/*
					 The user is not logged to the app, or into Facebook:
 			 		destroy the session on the server.
					*/			 
				}
			});
		}
		getUserInfo = function() {
			var _self = this;
			FB.api('/me', function(response) {
				$rootScope.$apply(function() { 
					$rootScope.user = _self.user = response; 
				});
			});
		}
		logout = function() {
			var _self = this;
			FB.logout(function(response) {
				$rootScope.$apply(function() { 
					$rootScope.user = _self.user = {}; 
				});	
			});
		}
    };
});