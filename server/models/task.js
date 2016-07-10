var models = require('./models');
Schema = models.Schema;

var TaskSchema = new Schema({
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    ended: {
        estatus: {type: Boolean, default: false},
        fecha: Date
    }
});

var Task = models.model('Task', TaskSchema, 'tasks');
module.exports = Task;