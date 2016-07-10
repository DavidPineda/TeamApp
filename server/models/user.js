var models = require('./models');
Schema = models.Schema;

var UserSchema = new Schema({
    name: string,
    username: string,
    password: string,
    twitter: string
});

var User = models.model('User', UserSchema, 'users');
module.exports = User;