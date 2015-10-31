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
            registerSponsorUser: registerSponsor,
            registerNgoUser: registerNgo
        };

        return service;

        function registerSponsor(regObj) {
            var deferred = $q.defer();
            var postData = regObj;

            $http.post(CONSTANTS.SERVICE_URL + 'api/register', postData).then(function(response) {
                if(response && response.data) {
                    deferred.resolve(response.data);
                }                
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function registerNgo(regObj) {
            var deferred = $q.defer();
            var postData = regObj;

            $http.post(CONSTANTS.SERVICE_URL + 'api/register', postData).then(function(response) {
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