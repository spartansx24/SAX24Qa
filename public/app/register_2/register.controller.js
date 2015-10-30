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
            
        this.submitForm = function(loginForm) {
            if(loginForm.$valid) {                
                $loading.start('commonLoader');
                LoginService.validateUserLoginDetils(this.loginField.userRole, this.loginField.email, this.loginField.password).then(function(result){
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
        }
    }

})();