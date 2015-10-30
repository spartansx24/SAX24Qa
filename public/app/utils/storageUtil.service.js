/**
 * @ngdoc factory
 * @name UtilApp.factory:StorageUtil
 * @description
 * # StorageUtil
 * Session and localstorage service
 */

(function() {
    
    'use strict';

    angular
        .module('UtilApp')
        .factory('StorageUtil', StorageUtil);

    StorageUtil.$inject = ['$window', '$rootScope'];

    function StorageUtil($window, $rootScope) {

        var service = {
            setLocal: setLocal,
            getLocal: getLocal,
            setLocalObject: setLocalObject,
            getLocalObject: getLocalObject,
            removeLocal: removeLocal,
            setSession: setSession,
            getSession: getSession,
            setSessionObject: setSessionObject,
            getSessionObject: getSessionObject,
            removeSession: removeSession
        };

        return service;

        function setLocal(key, value) {
            if($window.localStorage) {
                if(key && value) {
                    $window.localStorage.setItem(key, value);
                    return true;    
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key or value supplied in setLocal'});
                    return false;
                }
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'localStorage not supported'});
                return false;
            }
        }

        function getLocal(key) {
            if($window.localStorage) {
                if(key) {
                    return $window.localStorage.getItem(key);    
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key supplied in getLocal'});
                    return null;
                }                    
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'localStorage not supported'});
                return false;
            }
        }

        function setLocalObject(key, Obj) {
            if ($window.localStorage) {
                if(key && Obj && typeof(Obj) === 'object') {
                    $window.localStorage.setItem(key, $window.JSON.stringify(value));
                    return true;
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key or Obj supplied in setLocalObject'});
                    return false;
                }
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'localStorage not supported'});
                return false;
            }
        }

        function getLocalObject(key) {
            if ($window.localStorage) {
                if(key) {
                    return $window.JSON.parse($window.localStorage.getItem(key));
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key supplied in getLocalObject'});
                    return false;
                }                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'localStorage not supported'});
                return false;
            }
        }

        function removeLocal(key) {
            if ($window.localStorage) {
                if(key) {
                    $window.localStorage.removeItem(key);
                    return true;
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key supplied in removeLocal'});
                    return false;
                }                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'localStorage not supported'});
                return false;
            }
        }

        function setSession(key, value) {
            if ($window.sessionStorage) {
                if(key && value) {                        
                    $window.sessionStorage.setItem(key, value);
                    return true;
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key or value supplied in setSession'});
                    return false;
                }
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'sessionStorage not supported'});
                return false;
            }
        }

        function getSession(key) {
            if ($window.sessionStorage) {
                if(key) {
                    return $window.sessionStorage.getItem(key);
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key supplied in getSession'});
                    return false;
                }
                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'sessionStorage not supported'});
                return false;
            }
        }
    
        function setSessionObject(key, Obj) {
            if ($window.sessionStorage) {
                if(key && Obj && typeof(Obj) === 'object') {
                    $window.sessionStorage.setItem(key, $window.JSON.stringify(value));
                    return true;
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key or Obj supplied in setSessionObject'});
                    return false;
                }                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'sessionStorage not supported'});
                return false;
            }
        }

        function getSessionObject(key) {
            if ($window.sessionStorage) {
                if(key) {
                    return $window.JSON.parse($window.sessionStorage.getItem(key));
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key in getSessionObject'});
                    return false;
                }
                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'sessionStorage not supported'});
                return false;
            }            
        }

        function removeSession(key) {
            if ($window.sessionStorage) {
                if(key) {
                    $window.sessionStorage.removeItem(key);
                    return true;
                } else {
                    $rootScope.addError({message:'StorageUtil Error', reason:'Invalid Key in removeSession'});
                    return false;
                }
                
            } else {
                $rootScope.addError({message:'StorageUtil Error', reason:'sessionStorage not supported'});
                return false;
            }            
        }
    }

})();