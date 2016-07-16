var _ = require('lodash');
var users = [];
module.exports = function(server){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        socket.on('new:task', function(data){
            io.emit('new:action', data);
        });

        socket.on('new:resource', function(data){
            io.emit('new:action', data);
        });

        socket.on('disconnect', function(){
            var list = _.reject(users, function(user){
                return user.socket === socket.id;
            });
            socket.emit('users:list', users);
        });  

        socket.on('new:user', function(data){
            var index = _.findIndex(users, {_id: data.user._id});
            if(index > -1){
                users[index].socket = socket.id;
            }else{
                users.push({
                    _id: data.user._id, 
                    socket: socket.id, 
                    name: data.user.name, 
                    username: data.user.username
                });
            }
            console.log(users);
            socket.broadcast.emit('users:list', users);
        });

        socket.on('users', function(data){
            socket.emit('users:list', users);
        });

        socket.on('new:message:general', function(message){
            io.emit('message:general', message);
        });

        socket.on('new:message:individual', function(message){
            var index = _.findIndex(users, {_id: message.receiver._id});
            if(index > -1){
                socket.broadcast.in(users[index].socket).emit('message:individual', message);
            }
        });        
    });
}