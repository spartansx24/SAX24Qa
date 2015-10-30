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
        .service('AddCauseService', AddCauseService);

    AddCauseService.$inject = ['$http', '$q', 'CONSTANTS'];

    function AddCauseService($http, $q, CONSTANTS) {

        var service = {
            addChallengeData: addChallengeData
        };

        return service;

        function addChallengeData(addChallengeObj) {
            var deferred = $q.defer();
            var postData = addCauseObj;

            $http.post(CONSTANTS.SERVICE_URL + 'api/addNgoCause', postData).then(function(response) {
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