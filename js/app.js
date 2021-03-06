var tennisme = angular.module('tennisme',['shoppinpal.mobile-menu', '$strap.directives'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.
      when('/slots', {templateUrl: 'partials/slots.html',   controller: 'SlotsCtrl'}).
      when('/slots/:slotDate', {templateUrl: 'partials/slot.html', controller: 'SlotCtrl'}).
      when('/clubs', {templateUrl: 'partials/clubs.html',   controller: 'ClubsCtrl'}).
      when('/account', {templateUrl: 'partials/account.html',   controller: 'ProfileCtrl'}).
      otherwise({redirectTo: '/slots'});
}]);