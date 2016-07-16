var app = angular.module('Teamapp');

app.controller('chatCtrl', function($scope, $stateParams, $state, Socket, Session){
    $scope.usersConnected = [];
    $scope.chat = 'general';
    $scope.messagesList = new Object();
    $scope.messagesList[$scope.chat] = [];

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
        })
    }

    $scope.goToChat = function(){
        $state.go('app.chat.general');
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
            $scope.messagesList[$scope.chat].push(message);
        }
    });

});