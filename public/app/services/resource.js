angular.module('Teamapp').factory('ResourceService', function($http){
    return{
        getResourcesReceived: function(){
            return $http.get('/resources/received');
        },
        getResourcesSent: function(){
            return $http.get('/resources/sent');
        },
        getDetail: function(resource){
            return $http.get('/resource/' + resource.id);
        }        
    }
});