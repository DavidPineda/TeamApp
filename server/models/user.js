var models = require('./models');
Schema = models.Schema;

var userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    twitter: String
});

userSchema.methods = {
    authenticate: function(password){
        return this.password == password;
    }
}

var User = models.model('User', userSchema, 'users');
module.exports = User;