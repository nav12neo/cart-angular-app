'use strict';

angular.module('myApp.productsView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'controllers/products/productsView.html',
    controller: 'productsViewCtrl'
  });
}])

.controller('productsViewCtrl', ['$scope', '$http','cartService','$timeout', function($scope, $http,cartService,$timeout) {

    $scope.isLoading = true;
    $http.get("data/products.json")
        .then(function(response) {
            console.log(response);
            $scope.products = response.data;
        }).catch(function(error){
            console.log("error",error);
        }).finally(function(){
            $timeout(function(){
                $scope.isLoading = false;
            },2000);
        });


    $scope.addToCart = function (product) {
        product.quantity = 1;
        cartService.addProduct(product);
    }
}]);