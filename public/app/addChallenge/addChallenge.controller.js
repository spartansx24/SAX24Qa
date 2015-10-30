/**
 * @ngdoc controller
 * @name angularApp.controller:LoginController
 * @description
 * # LoginController
 * Login Controller to validate user login
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('AddChallengeController', AddChallengeController);

    AddChallengeController.$inject = ['AddChallengeService', '$scope', 'toastr', '$location', 'StorageUtil', '$loading'];

    function AddChallengeController( AddChallengeService, $scope, toastr, $location, StorageUtil, $loading) {
          $scope.today = function() {
            $scope.start_date = new Date();
            $scope.end_date = new Date();
          };
          $scope.today();

          $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
          };
          $scope.toggleMin();
          $scope.maxDate = new Date(2020, 5, 22);

          $scope.start_open = function($event) {
            $scope.status.start_opened = true;
          };

          $scope.end_open = function($event) {
            $scope.status.end_opened = true;
          };

          $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          $scope.formats = ['dd-MMMM-yyyy'];
          $scope.format = $scope.formats[0];

          $scope.status = {
            opened: false
          };
   
        this.submitForm = function(addChallengeForm) {
            if(addChallengeForm.$valid) {                
                $loading.start('commonLoader');
                var userObj =  StorageUtil.getLocalObject('userObj');
                var addChallengeobj = {};
                addChallengeobj.name = this.addChallangeField.name;
                addChallengeobj.description = this.addChallangeField.desc;
                addChallengeobj.sponsor = userObj._id;
                addChallengeobj.target = this.addChallangeField.target;
                addChallengeobj.contribution = this.addChallangeField.amount;
                addChallengeobj.challengeLocation = this.addChallangeField.location;
                addChallengeobj.startTime = $scope.start_date;
                addChallengeobj.endTime = $scope.end_date;

                AddChallengeService.addChallengeData(addChallengeobj).then(function(result){
                    if(result.status === true) {
                        
                        $loading.finish('commonLoader');
                        toastr.success('Challenge added successfully', {
                          closeButton: true
                        });
                    } else {
						$loading.finish('commonLoader');
                        toastr.error('Error while adding challenge', {
                          closeButton: true
                        });
                    }
                }, function(error){
                    $loading.finish('commonLoader');
                });
            }
        }
    }

})();