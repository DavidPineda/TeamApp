angular.module('Teamapp').factory('ResourceService', function($http){
    return{
        getResourcesReceived: function(){
            return $http.get('/resources/receiver');
        },
        getResourcesSend: function(){
            return $http.get('/resources/send');
        },
        getDetail: function(resourceName){
            return $http.get('/resource/' + resourceName);
        }        
    }
});