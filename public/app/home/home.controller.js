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

    HomeController.$inject = ['$rootScope', 'HomeService', 'StorageUtil', '$location', '$loading'];

    function HomeController($rootScope, HomeService, StorageUtil, $location, $loading) {
    	var vm = this;
        $rootScope.loggedIn = true;
        vm.loadHomePageData = function() {
            $loading.start('commonLoader');
            var userObj =  StorageUtil.getLocalObject('userObj');
            vm.userObj = userObj;
            if(userObj.userRole == 2) {
                HomeService.getChallengeList(userObj._id).then(function(result) {
                    vm.challangeList = result;
                    $loading.finish('commonLoader');
                }, function(error){
                    $loading.finish('commonLoader');
                });
            } else {
                HomeService.getCauseList(userObj._id).then(function(result) {
                    vm.causeList = result;
                    $loading.finish('commonLoader');
                }, function(error){
                    $loading.finish('commonLoader');
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