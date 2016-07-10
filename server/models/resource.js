var models = require('./models');
Schema = models.Schema;

var ResourceSchema = new Schema({
    files: [{type: String}],
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: [{type: String}],
    date: {type: Date, default: Date()},
    subject: String
});

var Resource = models.model('Resource', ResourceSchema, 'resources');
module.exports = Resource;