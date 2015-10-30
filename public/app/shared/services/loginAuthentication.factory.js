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

    loginAuthenticationFactory.$inject = ['StorageUtil'];

    function loginAuthenticationFactory(StorageUtil) {

        var service = {
            getLoggedInUserId: getLoggedInUserId
        };

        return service;

        function getLoggedInUserId() {            
            var userObj = StorageUtil.getLocal('userObj');
            if(userObj) {
                userObj = JSON.parse(userObj);
                return (userObj && userObj._id);
            }
            
        }
    }

})();