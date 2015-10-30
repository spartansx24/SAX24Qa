/**
 * @ngdoc config
 * @name angularApp.config:routesConfig
 * @description
 * # routesConfig
 * routesConfig used to maintain the routes for angularApp
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesConfig($routeProvider, $locationProvider) {
    
        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {                                
                            return $q.reject({
                                authenticated: true
                            });
                        } else {
                            return $q.resolve();
                        }
                    }]
                }
            })
            .otherwise({
                redirectTo: '/home'
            });
        $locationProvider.html5Mode(true);
    }

})();