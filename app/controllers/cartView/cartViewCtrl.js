'use strict';

angular.module('myApp.cartModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'controllers/cartView/cartView.html',
    controller: 'cartViewCtrl'
  });
}])

.controller('cartViewCtrl', ['$scope','cartService' , function($scope, cartService) {

    $scope.cartProducts = [];
    $scope.Total = 0;
    let getCartProducts = function () {
        $scope.Total = 0;
        $scope.cartProducts = cartService.getCartDetails();
        angular.forEach($scope.cartProducts,function(item){
            $scope.Total += item.price * item.quantity;

        })
        console.log($scope.Total);
    };
    $scope.removeProduct = function(product) {
        let isDeleted = cartService.deleteProduct(product);
        if(isDeleted) {
            getCartProducts()
        }
    };

    $scope.updateQuantity = function(product,index) {
        product.quantity = $scope.cartProducts[index].quantity;
        let isUpdated = cartService.updateQuantity(product);
        if(isUpdated) {
            getCartProducts()
        }
    };

    getCartProducts()
}]);