/**
 * @ngdoc controller
 * @name angularApp.controller:HomeController
 * @description
 * # HomeController
 * Home Controller loads home page data
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', 'StorageUtil', '$location'];

    function HomeController(HomeService, StorageUtil, $location) {
    	var vm = this;
        vm.loadHomePageData = function() {
            HomeService.getChallengeList().then(function(result) {
                vm.content = result.content;
            }, function(error){

            });
        }

        vm.logoutUser = function() {
            var status = StorageUtil.removeLocal('userId');
            if(status) {
                $location.path('/login');
            }
        }

        vm.loadHomePageData();
    }

})();