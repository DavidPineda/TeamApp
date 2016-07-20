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

    $scope.getChatType = function(callback){
        var id = $state.params.hasOwnProperty('idChat');
        if(id){
            callback($state.params.idChat);
        }else{
            callback('general');
        }
    }

    $scope.whereIam = function(callback){        
        $scope.getChatType(function(type){
            $scope.chat = type;
            if(typeof callback == 'function'){
                callback($scope.chat);
            }        
        });
    };

    $scope.sendMessageGeneral = function(){
        Session.getUser()
        .then(function(response){
            var data = {};
            var sender = response.data.user.user;
            data = {content: $scope.message, type: 'general', sender: sender};
            ChatService.sendMessage(data)
            .then(function(response){
                Socket.emit('new:message:general', data);
                $scope.message = '';
            });
        });
    }

    $scope.sendMessageIndividual = function(){
        var data = {};
        data = {
            content: $scope.message, 
            type: 'individual', 
            receiver: {_id: $scope.other._id.toString()},
            chat: $scope.chat
        };
        ChatService.sendMessage(data)
        .success(function(response){
            data.sender = response.message[0].sender;
            $scope.setChat(data);
            Socket.emit('new:message:individual', data);
            $scope.message = '';
        }).error(function(response){
            console.error(response);
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
    
    $scope.getMessages = function(){
        $scope.whereIam(function(chat){
            if(chat == 'general'){
                $scope.goToChat('general');
                ChatService.getMessagesGeneral()
                .success(function(response){
                    $scope.messagesG = response[0].message;
                });
            }else{
                ChatService.getMesagesIndividual({chat: $scope.chat})
                .success(function(response){
                    $scope.goToChat(response.other._id);
                    _.each(response.chat.message, function(message){
                        message.chat = response.chat._id;
                    });
                    $scope.messagesList[$scope.chat] = response.chat.message;
                });
            }            
        });
    }();

    $scope.setChat = function(message){
        if($scope.messagesList){
            if(message.chat && $scope.chat){
                if($scope.messagesList.hasOwnProperty(message.chat)){
                    $scope.messagesList[message.chat].push(message);
                }else{
                    $scope.messagesList[message.chat] = new Array();
                    $scope.messagesList[message.chat].push(message);
                }
            }
        }
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
        $scope.setChat(message);
    });

    $scope.$on("$destroy", function(event){
        Socket.init();
    });
});