var models = require('./models');
Schema = models.Schema;

var chatSchema = new Schema({
    remitente: {type: Schema.Types.ObjectId, ref: 'User'},
    destinatario: {type: Schema.Types.ObjectId, ref: 'User '},
    tipo: String,
    mensaje: [{
        remitente: {type: Schema.Types.ObjectId, ref: 'User'},
        destinatario: {type: Schema.Types.ObjectId, ref: 'User '},
        contenido: String        
    }]
});

var Chat = models.model('Chat', chatSchema, 'chats');
module.exports = Chat;