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
        .service('AddChallengeService', AddChallengeService);

    AddChallengeService.$inject = ['$http', '$q', 'CONSTANTS'];

    function AddChallengeService($http, $q, CONSTANTS) {

        var service = {
            addChallengeData: addChallengeData
        };

        return service;

        function addChallengeData(addChallengeObj) {
            var deferred = $q.defer();
            var postData = addChallengeObj;

            $http.post(CONSTANTS.SERVICE_URL + 'api/addSponsorChallenge', postData).then(function(response) {
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