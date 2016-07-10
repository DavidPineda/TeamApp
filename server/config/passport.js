var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done){
    if(user){
        done(null, user);
    }
});

passport.deserializeUser(function(user, done){
    User.findOne({_id: user._id})
    .exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
});

passport.use('local', new LocalStrategy(function(username, password, done){
    User.findOne({username: username})
    .exec(function(err, user){
        if(user && user.authenticate(password)){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

passport.use(new TwitterStrategy({
    consumerKey: '9qbJtLes9b4dhxYiak4bHIPoy',
    consumerSecret: '8swr1s35fzBr4BM80c2Y7iBCGjT3bGlxhGSxn811Ayp0k9YVkZ',
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
},
function(token, tokenSecret, profile, done){
    User.findOne({username: profile.username})
    .exec(function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }
        if(user){
            user.twitter = profile;
            user.save(function(err, user){
                if(err){
                    return done(err);
                }
                done(null, user);
            });            
        }else{
            new User({
                username: profile.username,
                name: profile.displayName,
                twitter: profile
            }).save(function(err, user) {
                if(!err){
                    return done(null, user);
                }else{
                    return done(err);
                }
            });
        }
    });
}));

module.exports = passport;