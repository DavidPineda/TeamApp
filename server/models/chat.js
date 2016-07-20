var models = require('./models');
Schema = models.Schema;

var chatSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: Schema.Types.ObjectId, ref: 'User'},
    type: String,
    message: [{
        sender: {type: Schema.Types.ObjectId, ref: 'User'},
        receiver: {type: Schema.Types.ObjectId, ref: 'User'},
        content: String        
    }]
});

var Chat = models.model('Chat', chatSchema, 'chats');
module.exports = Chat;