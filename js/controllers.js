function NavCtrl($scope, $location) {
  $scope.page = function (path) {
      $location.path(path);
  };
}

function SlotsCtrl ($scope,$location, $http, getSlots) {
  getSlots.async().then(function(d) {
    $scope.slots = d;
  });

  $scope.page = function (path) {
      $location.path(path);
  };
};

function SlotCtrl ($scope, $routeParams,$location,$http) {
 $scope.date = $routeParams.date;
};

function ClubsCtrl ($scope, $http) {
	$http.defaults.useXDomain = true;
};

function ProfileCtrl ($scope, $http, getProfile) {
 $scope.levelsMap={
    '0': 'nc',
    '1': '30/5',
    '2': '30/4', 
    '3': '30/3',
    '4': '30/2',
    '5': '30/1',
    '6': '30',
    '7': '15/5',
    '8': '15/4',
    '9': '15/3',
    '10': '15/2',
    '11': '15/1',
    '12': '15',
    '13': '5/6',
    '14': '4/6',
    '15': '3/6',
    '16': '2/6',
    '17': '1/6',
    '18': '0',
    '19': '-2/6',
    '20': '-4/6',
    '21': '-15',
    '22': '-30',
    '23': 'Prom',
    '24': '1ère',
  }
  Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
  }
  getProfile.async().then(function(d) {
    $scope.name = d.fullname;
    $scope.email = d.email;
    $scope.gender = d.gender;
    $scope.level = $scope.levelsMap[d.level];
    $scope.dob = d.date_of_birth;
  });
  $scope.levelSelected = undefined;
  // $scope.value = levelsMap.getKeyByValue($scope.level);

  $scope.validate = function()  {
    $http.defaults.useXDomain = true;
    var postData = {};
    postData['auth_token'] = 'zvLgHfsSMKb8B7yjGGUj';
    postData['user'] = {date_of_birth: $scope.dob, email: $scope.email, phone_number: $scope.phone , level:$scope.level};
    $http.put('http://tennis-me.com/account', angular.toJson(postData))
      .error(function(data, status) {
        alert(data)
    });
  }
};