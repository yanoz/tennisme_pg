function NavCtrl($scope, $location) {
  $scope.page = function (path) {
      $location.path(path);
  };
}

function SlotsCtrl ($scope,$location, $http) {
	$http.defaults.useXDomain = true;
  $http({method: 'GET', url: 'http://tennis-me.com/slots.json?auth_token=zvLgHfsSMKb8B7yjGGUj'})
      .success(function(data, status) {
           $scope.slots = data;
    });
};

function ClubsCtrl ($scope, $http) {
	$http.defaults.useXDomain = true;
};

function ProfileCtrl ($scope, $http) {
	$http.defaults.useXDomain = true;
  $http.defaults.useXDomain = true;
  $scope.levelSelected = undefined;
  $scope.levels=["nc", "30/5","30/4","30/3","30/2","30/1","30","15/5","15/4","15/3","15/2","15/1","15","5/6","4/6","3/6","2/6","1/6","0","-2/6","-4/6","-15","-30","Prom","1ère"];
  $http({method: 'GET', url: 'http://tennis-me.com/account.json?auth_token=zvLgHfsSMKb8B7yjGGUj'})
    .success(function(data, status) {
        $scope.name = data.fullname;
        $scope.email = data.email;
        $scope.gender = data.gender;
        $scope.level = $scope.levels[data.level];
        $scope.dob = data.date_of_birth;
        $scope.phone = data.phone_number;
      });

  $scope.validate = function()  {
    $http.defaults.useXDomain = true;
    var postData = {};
    postData['auth_token'] = 'zvLgHfsSMKb8B7yjGGUj';
    postData['user'] = {date_of_birth: $scope.dob, email: $scope.email, phone_number: $scope.phone , level:$scope.level};
    alert(angular.toJson(postData));
    $http.post('http://tennis-me.com/account', angular.toJson(postData))
      .error(function(data, status) {
        alert(data)
      });
  }
};