'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'LocalStorageModule',
  'myApp.accountView',
  'myApp.productsView',
  'myApp.cartModule',
  'myApp.version',
  'myApp.service',
  'myApp.authenticationService'
]).
config(['$locationProvider', '$routeProvider','localStorageServiceProvider',
        function($locationProvider, $routeProvider, localStorageServiceProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/products'});

  localStorageServiceProvider
    .setPrefix('cartApp')
    .setNotify(true, true);

}]).
run(['$rootScope','$location', '$cookies', '$http',
    function($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });

    }]).
controller('mainCtrl', ['$rootScope','$scope','cartService', function($rootScope,$scope,cartService) {
    let updateViewCart = function () {
        $scope.totalQuantity = 0;
        let cartProducts = cartService.getCartDetails();
        angular.forEach(cartProducts,function(item){
            $scope.totalQuantity += +item.quantity;
        })
    };

    $rootScope.$on('LocalStorageModule.notification.setitem', function() {
        updateViewCart();
    });

    $rootScope.$on('LocalStorageModule.notification.removeitem', function() {
        updateViewCart();
    });

    updateViewCart();
}]);
