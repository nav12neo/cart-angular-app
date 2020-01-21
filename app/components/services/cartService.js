'use strict';

angular.module('myApp.service', ['LocalStorageModule'])
    .factory('cartService', ['localStorageService',function(localStorageService) {
      let Service = {};

      Service.getCartDetails = function () {
          return localStorageService.get('products');
      };

      Service.addProduct = function (product) {
          let products = localStorageService.get('products');
          let quantityIncrement = false;
          if(!products) {
              products = [];
          }
          // check if producta already present increment quantity by 1
          for(let i= 0,len = products.length; i< len; i++){
              if(products[i].sku === product.sku ){
                  products[i].quantity++;
                  quantityIncrement = true;
                  break;
              }
          }

          if(!quantityIncrement) {
              products.push(product);
          }

          return localStorageService.set("products", products);
      };

      Service.deleteProduct = function (product) {
          let products = localStorageService.get('products');
          let newProducts = products.filter(function(item){
              return item.sku !== product.sku;
          });

          return localStorageService.set("products", newProducts);
      };

      Service.updateQuantity = function (product) {
          let products = localStorageService.get('products');
          let len = products.length;
          for(let i= 0; i< len; i++){
              if(products[i].sku === product.sku ){
                  products[i].quantity = product.quantity;
              }
          }
          return localStorageService.set("products",products);
      };

      return Service

    }]);