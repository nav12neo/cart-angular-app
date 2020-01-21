'use strict';

angular.module('myApp.accountView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'controllers/account/accountView.html',
    controller: 'accountViewCtrl'
  });
}])

.controller('accountViewCtrl', ['$rootScope','$scope','authenticationService','$location','$route',
    function($rootScope, $scope,authenticationService, $location, $route) {

    $scope.isLoggedIn = !(JSON.stringify($rootScope.globals) === "{}");
    $scope.currentUser = ($scope.isLoggedIn) ? $rootScope.globals.currentUser : "";

    $scope.login = function () {
        $scope.dataLoading = true;
        authenticationService.login($scope.email, $scope.password, function(response) {
            if(response.success) {
                authenticationService.setCredentials($scope.email, $scope.password);
                $location.path('/');
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    };

    $scope.logout = function () {
        // clear credentials when users comes to landing page, for demo
        authenticationService.clearCredentials();
        $route.reload();
    }
}]);