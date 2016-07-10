var models = require('./models');
Schema = models.Schema;

var taskSchema = new Schema({
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    ended: {
        estatus: {type: Boolean, default: false},
        fecha: Date
    }
});

var Task = models.model('Task', taskSchema, 'tasks');
module.exports = Task;