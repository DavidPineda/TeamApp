var models = require('./models');
Schema = models.Schema;

var taskSchema = new Schema({
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    ended: {
        status: {type: Boolean, default: false},
        date: {type: Date, default: new Date()}
    }
});

var Task = models.model('Task', taskSchema, 'tasks');
module.exports = Task;