angular.module('Teamapp').factory('ChatService', function($http){
    return{
        createSpeaking: function(receiver){
            return $http.post('/speaking', receiver);
        },

        sendMessage: function(data){
            return $http.post('/message', data);
        },

        getMessagesGeneral: function(){
            return $http.get('/messages/general');
        },

        getMesagesIndividual: function(id){
            return $http.get('/messages/' + id.chat);
        }
    }
});