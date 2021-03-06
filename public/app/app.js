/**
 * @ngdoc module.
 * @name angularApp
 * @description
 * # angularApp
 * Main module of the application 
 */


 (function() {
    'use strict';
    angular
        .module('angularApp', [
            'UtilApp',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngSanitize',
            'ngTouch'
        ])
        .run(["$rootScope", "$location", function($rootScope, $location) {
            $rootScope.showLaunchPage = true;
            $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
                if (eventObj.authenticated === false) {
                    $location.path("/login");
                } else {
                    $location.path(current);
                }
            });
            $rootScope.routeToLogin = function() {
                $location.path("/login");
            }

            $rootScope.routeToMain = function() {
                $location.path("/");
            }

            $rootScope.routeToHome = function() {
                $location.path("/home");
            }
            

            $rootScope.$on('$routeChangeSuccess', function() {
                $rootScope.showLaunchPage = ($location.path() == "/");
            });
        }]);
})();