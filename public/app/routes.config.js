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
            .when('/addNewChallenge', {
                templateUrl: 'app/addChallenge/addChallenge.html',
                controller: 'AddChallengeController',
                controllerAs: 'addChallengeCtrl',
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
            .when('/addNewCause', {
                templateUrl: 'app/addCause/addCause.html',
                controller: 'AddCauseController',
                controllerAs: 'addCauseCtrl',
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
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl',
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