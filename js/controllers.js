function NavCtrl($scope, $location) {
  $scope.page = function (path) {
      $location.path(path);
  };
}

function SlotsCtrl ($scope,$location, $http, getSlots, printer) {
  getSlots.async().then(function(d) {
    $scope.slots = printer.printSlots(d);
  });
  $scope.page = function (path) {
    $location.path(path);
  };
};

function SlotCtrl ($scope, $routeParams,$location,$http) {
  $scope.slotDate = $routeParams.formatedDate;
};

function GeolocationCtrl ($scope,$rootScope, printer) {
  var pos;
  navigator.geolocation.getCurrentPosition(function(position) {
    $scope.position = position.coords.latitude;
    // addr = printer.printAddress(position);
  },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });
};

function ClubsCtrl ($scope, $http) {
	$http.defaults.useXDomain = true;
};

function ProfileCtrl ($scope, $http, getProfile) {

 var levelsMap = {
    'nc' : '0' ,
    '30/5' : '1' ,
    '30/4' : '2' , 
    '30/3' : '3' ,
    '30/2' : '4' ,
    '30/1' : '5' ,
    '30' : '6' ,
    '15/5' : '7' ,
    '15/4' : '8' ,
    '15/3' : '9' ,
    '15/2' : '10' ,
    '15/1' : '11',
    '15' : '12',
    '5/6' : '13' ,
    '4/6' : '14' ,
    '3/6' : '15' ,
    '2/6' : '16' ,
    '1/6' : '17' ,
    '0' : '18' ,
    '-2/6' : '19' ,
    '-4/6' : '20' ,
    '-15' : '21' ,
    '-30' : '22' ,
    '1&egrave;re' : '23'
  }

  $scope.keys = Object.keys(levelsMap);
  // $scope.values = keys.map(function(v) { return levelsMap[v]; });
  
 
  getProfile.async().then(function(d) {
    $scope.name = d.fullname;
    $scope.email = d.email;
    $scope.gender = d.gender;
    $scope.levelSelected = $scope.keys[d.level];
    $scope.dob = d.date_of_birth;
  });


  $scope.validate = function()  {
    $http.defaults.useXDomain = true;
    var postData = {};
    postData['auth_token'] = 'zvLgHfsSMKb8B7yjGGUj';
    postData['user'] = {date_of_birth: $scope.dob, email: $scope.email, phone_number: $scope.phone , level:levelsMap[$scope.levelSelected]};
  
    $http.put('http://tennis-me.com/account', angular.toJson(postData))
      .error(function(data, status) {
        alert(data)
    });
    
  }
};