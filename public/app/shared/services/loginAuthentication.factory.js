/**
 * @ngdoc factory
 * @name angularApp.factory:loginAuthenticationFactory
 * @description
 * # loginAuthenticationFactory
 * loginAuthentication Factory for user login check
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('loginAuthenticationFactory', loginAuthenticationFactory);

    loginAuthenticationFactory.$inject = ['StorageUtil', '$rootScope'];

    function loginAuthenticationFactory(StorageUtil, $rootScope) {

        var service = {
            getLoggedInUserId: getLoggedInUserId
        };

        return service;

        function getLoggedInUserId() {            
            var userObj = StorageUtil.getLocal('userObj');
            if(userObj) {
                $rootScope.loggedIn = true;
                userObj = JSON.parse(userObj);
                return (userObj && userObj._id);
            }
            
        }
    }

})();