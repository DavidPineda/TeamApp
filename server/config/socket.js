module.exports = function(server){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        socket.on('new:task', function(data){
            io.emit('new:action', data);
        });

        socket.on('new:resource', function(data){
            io.emit('new:action', data);
        });        
    });
}