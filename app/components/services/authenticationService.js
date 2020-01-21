'use strict';

angular.module('myApp.authenticationService', ['ngCookies'])
    .factory('authenticationService', ['$http', '$cookies', '$rootScope', '$timeout',
        function($http, $cookies, $rootScope, $timeout) {
        let Service = {};

         Service.login = function (email, password, callback) {

            $timeout(function(){
                let response = { success: email === 'test@email.com' && password === 'test' };
                if(!response.success) {
                    response.message = 'Email or password is incorrect';
                }
                callback(response);
            }, 1000);

        };

        Service.setCredentials = function (email, password) {
            let authData = email + ':' + password;

            $rootScope.globals = {
                currentUser: {
                    email: email,
                    authdata: authData
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData; // jshint ignore:line
            $cookies.putObject('globals', $rootScope.globals);
        };

        Service.clearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return Service;

    }]);