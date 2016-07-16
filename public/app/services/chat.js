angular.module('Teamapp').factory('ChatService', function($http){
    return{
        createSpeaking: function(receiver){
            return $http.post('/speaking', receiver);
        }
    }
});