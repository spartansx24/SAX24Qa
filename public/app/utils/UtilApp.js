/**
 * @ngdoc module.
 * @name UtilApp
 * @description
 * # UtilApp
 * Common util app to be use by other module app of the application 
 */

'use strict';

angular
    .module("UtilApp", [
        'ngRoute',
        'ngAnimate', 
        'toastr',
        'darthwade.dwLoading'
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpErrorHandlerService');
    }])

    .run(function($rootScope, toastr) {
        $rootScope.addError = function(errorObj){
            console.log("errorObj----", errorObj);
            toastr.error(errorObj.reason, errorObj.message);
        }
    });