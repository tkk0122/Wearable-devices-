// public/js/services/NerdService.js
angular.module('PhotoService', []).factory('Photo', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/photos');
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(photoData) {
            return $http.post('/photos', photoData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/photos/' + id);
        }
    }       

}]);