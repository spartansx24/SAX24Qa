/**
 * @ngdoc constants
 * @name UtilApp.constant:CONSTANTS
 * @description
 * # CONSTANTS
 * CONSTANTS used for util App
 */

(function() {
    'use strict';

    angular
        .module('UtilApp')
        .constant('CONSTANTS', {
            PRODUCTION_ENV: true,
            NETWORK_ERROR_MSG: {
                STATUS_0: 'The server is unreachable.',
                STATUS_401: 'Service request error..',
                STATUS_500: 'Unknown errors occurred at the server.',
                STATUS_404: 'The requested data or service could not be found.',
                STATUS_405: 'Service request error..',
                STATUS_400: 'Bad Request',
                UNKNOWN: 'Unknown error'
            },
        });
})();