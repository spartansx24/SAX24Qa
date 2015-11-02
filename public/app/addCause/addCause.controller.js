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
        .controller('AddCauseController', AddCauseController);

    AddCauseController.$inject = ['AddCauseService', '$scope', 'toastr', '$location', 'StorageUtil', '$loading'];

    function AddCauseController( AddCauseService, $scope, toastr, $location, StorageUtil, $loading) {
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
                var addCauseobj = {};
                addCauseobj.firstName = this.addChallangeField.name;
                addCauseobj.description = this.addChallangeField.desc;
                addCauseobj.ngo = userObj._id;
                addCauseobj.target = this.addChallangeField.target;
                addCauseobj.location = this.addChallangeField.location;
                addCauseobj.contactPerson = this.addChallangeField.contact_person;                
                addCauseobj.startDate = $scope.start_date;
                addCauseobj.endDate = $scope.end_date;

                AddCauseService.addChallengeData(addCauseobj).then(function(result){
                    if(result.status === true) {
                        
                        $loading.finish('commonLoader');
                        toastr.success('Cause added successfully', {
                          closeButton: true
                        });
                        setTimeout(function() {
                          $location.path('/home');
                        }, 1000);
                    } else {
						            $loading.finish('commonLoader');
                        toastr.error('Error while adding Cause', {
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