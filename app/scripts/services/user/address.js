'use strict';

angular.module('nodeserverApp')
    .factory('UserAddressService', function ($resource) {
        return $resource('/api/address/manage', {
        }, { //parameters default
            update: {
                method: 'PUT',
                params: {id: '@id'}
            },
            get: {
                method: 'GET',
                params: {
                    id:'me'
                }
            }
        });
    })