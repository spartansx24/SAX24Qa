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

    HomeController.$inject = ['$rootScope', 'HomeService', 'StorageUtil', '$location'];

    function HomeController($rootScope, HomeService, StorageUtil, $location) {
    	var vm = this;
        $rootScope.loggedIn = true;
        vm.loadHomePageData = function() {
            var userObj =  StorageUtil.getLocalObject('userObj');
            vm.userObj = userObj;
            if(userObj.userRole == 2) {
                HomeService.getChallengeList(userObj._id).then(function(result) {
                    vm.challangeList = result;
                }, function(error){

                });
            } else {
                HomeService.getCauseList(userObj._id).then(function(result) {
                    vm.causeList = result;
                }, function(error){

                });
            }
        }

        $rootScope.logoutUser = function() {
            var status = StorageUtil.removeLocal('userObj');
            if(status) {
                $rootScope.loggedIn = false;
                $location.path('/login');
            }
        }

        vm.routeToAddPage = function(route) {
            $location.path('/'+route);            
        }

        vm.loadHomePageData();
    }

})();