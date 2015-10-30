/**
 * @ngdoc service
 * @name angularApp.service:HomeService
 * @description
 * # HomeService
 * Home Service for home controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('HomeService', HomeService);

    HomeService.$inject = ['$http', '$q', 'CONSTANTS'];

    function HomeService($http, $q, CONSTANTS) {

        var service = {
            getHomePageData: getHomePageData,
            getChallengeList: getChallengeList
        };

        return service;

        function getHomePageData() {

            var deferred = $q.defer();
            deferred.resolve({'content': "Welcome to home page"});
            return deferred.promise;
        }

        function getChallengeList(sponserId) {

            var deferred = $q.defer();
            var postData = {'sponserId' : sponserId};
            $http.post(CONSTANTS.SERVICE_URL + 'api/sponserChallengeList', postData).then(function(response) {
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