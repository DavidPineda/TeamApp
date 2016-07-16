var app = angular.module('Teamapp');

app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session, ChatService){
    $scope.usersConnected = [];
    $scope.chat = null;
    $scope.messagesList = [];
    $scope.message = '';

    $scope.messagesG = [];
    $scope.messages = [];

    if($scope.usersConnected.length <= 0){
        Socket.emit('users');
    }

    $scope.sendMessageGeneral = function(){
        Session.getUser()
        .then(function(response){
            var data = {};
            var name = response.data.user.user.name;
            data = {content: $scope.message, type: 'general', name: name};
            Socket.emit('new:message:general', data);
            $scope.message = '';
        });
    }

    $scope.sendMessageIndividual = function(){
        Session.getUser()
        .then(function(response){
            var data = {};
            var name = response.data.user.user.name;
            data = {
                content: $scope.message, 
                type: 'individual', 
                receiver: {_id: $scope.other._id.toString()}, 
                sender: {name: name}, 
                chat: $scope.chat
            };
            $scope.messages.push(data);
            $scope.messagesList[$scope.chat] = $scope.messages;
            Socket.emit('new:message:individual', data);
            $scope.message = '';
        });
    }

    $scope.goToChat = function(receiver){
        ChatService.createSpeaking({receiver: receiver})
        .success(function(response){
            if(response.chat.type == 'individual'){
                $state.go('app.chat.individual', {idChat: response.chat._id});
                $scope.me = response.me;
                $scope.other = response.other;
            }else{
                $state.go('app.chat.general');
            }
        });        
    }

    $scope.getChatType = function(callback){
        var id = $stateParams.hasOwnProperty('idChat');
        if(id){
            callback($stateParams.idChat);
        }else{
            callback('general');
        }
    }

    whereIam = function(){        
        $scope.getChatType(function(type){
            $scope.chat = type;            
        });
    }
    
    $scope.getChatMessages = function(list){
        var messages = list[$scope.chat];
        return messages;
    }

    Socket.on('users:list', function(users){
        Session.getUser()
        .then(function(response){
            var user = response.data.user.user;
            var connecteds = _.reject(users, {_id: user._id});
            angular.copy(connecteds, $scope.usersConnected);
        });
    });

    Socket.on('message:general', function(message){        
        if($scope.messagesList && $scope.chat){
            $scope.messagesG.push(message);
        }
    });

    Socket.on('message:individual', function(message){
        if($scope.messagesList){
            if(message.chat && $scope.chat){
                if($scope.messagesList.hasOwnProperty(message.chat)){
                    $scope.messagesList[message.chat].push(message);
                }else{
                    $scope.messagesList[message.chat] = new Array();
                    $scope.messagesList[message.chat].push(message);
                }
                console.log($scope.messagesList, $scope.chat, message);
            }
        }
    });

    $scope.$on("$destroy", function(event){
        Socket.init();
    });

    whereIam();
});