/**
 * @ngdoc decorator
 * @name UtilApp.decorator:extendExceptionHandler
 * @description
 * # extendExceptionHandler
 * Exception Handler
 */
(function() {
    
    'use strict';

    angular
        .module('UtilApp')
        .config(['$provide', function($provide) {
            $provide.decorator('$exceptionHandler', extendExceptionHandler);
        }]);

    extendExceptionHandler.$inject = ['$delegate', '$injector'];

    function extendExceptionHandler($delegate, $injector) {
        return function(exception, cause) {
            var $rootScope = $injector.get("$rootScope");
            $delegate(exception, cause);       
            $rootScope.addError({message:"Exception", reason:exception.message});
        };
    }  

})();