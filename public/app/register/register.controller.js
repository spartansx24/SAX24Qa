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
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['RegisterService', 'toastr', '$location', 'StorageUtil', '$loading'];

    function RegisterController( RegisterService, toastr, $location, StorageUtil, $loading) {
            
        this.registerSponsorUser = function(SponsorRegisterForm) {
            if(SponsorRegisterForm.$valid) {
                $loading.start('commonLoader');
                var regObj = {};
                regObj.userRole = 2;
                regObj.firstName = this.registerField.firstName;
                regObj.type = this.registerField.type;
                regObj.phoneNumber = this.registerField.phoneNumber;
                regObj.email = this.registerField.email;
                regObj.address = this.registerField.address;
                regObj.password = this.registerField.password;


                RegisterService.registerSponsorUser(regObj).then(function(result){
                    if(result.status === true) {
                        // toastr.success('You are valid User', {
                        //   closeButton: true
                        // });
                         
                        $loading.finish('commonLoader');
                        if(StorageUtil.setLocalObject('userObj', result.userObj)) {
                            $location.path('/home');    
                        }
                        
                    } else {
						$loading.finish('commonLoader');
                        toastr.error('You are not a valid User', {
                          closeButton: true
                        });
                    }
                }, function(error){
                    $loading.finish('commonLoader');
                });
            }
        };

        this.registerNgoUser = function(NgoRegisterForm) {
            if(NgoRegisterForm.$valid) {
                $loading.start('commonLoader');
                var regObj = {};
                regObj.userRole = 3;
                regObj.firstName = this.registerField.firstName;
                regObj.description = this.registerField.description;
                regObj.type = this.registerField.type;
                regObj.phoneNumber = this.registerField.phoneNumber;
                regObj.email = this.registerField.email;
                regObj.address = this.registerField.address;
                regObj.workIn = this.registerField.workIn;
                regObj.contactPerson = this.registerField.contactPerson;
                regObj.password = this.registerField.password;

                RegisterService.registerNgoUser(regObj).then(function(result){
                    if(result.status === true) {
                        // toastr.success('You are valid User', {
                        //   closeButton: true
                        // });

                        $loading.finish('commonLoader');
                        if(StorageUtil.setLocalObject('userObj', result.userObj)) {
                            $location.path('/home');
                        }

                    } else {
                        $loading.finish('commonLoader');
                        toastr.error('You are not a valid User', {
                            closeButton: true
                        });
                    }
                }, function(error){
                    $loading.finish('commonLoader');
                });
            }
        };
    }

})();