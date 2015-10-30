/**
 * @ngdoc service
 * @name angularApp.service:LoginService
 * @description
 * # LoginService
 * Login Service for login controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('RegisterService', RegisterService);

    RegisterService.$inject = ['$http', '$q', 'CONSTANTS'];

    function RegisterService($http, $q, CONSTANTS) {

        var service = {
            validateUserLoginDetils: validateUserLoginDetils
        };

        return service;

        function validateUserLoginDetils(userRole, userName, password) {
            var deferred = $q.defer();
            var postData = {'userRole' : userRole, 'email': userName, 'password': password};

            $http.post(CONSTANTS.SERVICE_URL + 'api/validateLogin', postData).then(function(response) {
                if(response && response.data) {
                    deferred.resolve(response.data);
                }                
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }
})();