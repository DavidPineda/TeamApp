var models = require('./models');
Schema = models.Schema;

var timelineSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    task: {type: Schema.Types.ObjectId, ref: 'Task'},
    resource: {type: Schema.Types.ObjectId, ref: 'Resource'},
    type: String,
    date: {type: Date, default: Date()},
    action: String,
    description: string
});

var Timeline = models.model('Timeline', timelineSchema);
module.exports = Timeline;