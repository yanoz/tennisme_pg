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
  getProfile.async().then(function(d) {
    $scope.name = d.fullname;
    $scope.email = d.email;
    $scope.gender = d.gender;
    $scope.level = $scope.levels[d.level];
    $scope.dob = d.date_of_birth;
  });
  $scope.levelSelected = undefined;
  $scope.levels=["nc", "30/5","30/4","30/3","30/2","30/1","30","15/5","15/4","15/3","15/2","15/1","15","5/6","4/6","3/6","2/6","1/6","0","-2/6","-4/6","-15","-30","Prom","1ère"];

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