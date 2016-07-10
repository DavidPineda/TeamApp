var User = require('../models/user');
var passport = require('../config/passport');

exports.register = function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user){
        if(err){
            res.send({success: false, message: err});
        }else{
            req.logIn(user, function(err){
                if(!err){
                    res.send({logged: true, success: true, user: req.session.passport});
                }else{
                    console.log(err);
                    res.send({logged: false, success: true, user: user})
                }
            });
        }
    });
}

exports.login = function(req, res, next){
    var auth = passport.authenticate('local', function(err, user){
       if(err){
           console.log(err);
           return next(err);
       }
       if(!user){
           console.log('Not User');
           res.send({success: false});
       }else{
            req.login(user, function(err){
                if(err){
                    console.log('Error in Login');
                    return next(err);
                }
                res.send({success: true, user: user});
            });
       }
    });
    auth(req, res, next);
}

exports.userAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        res.send({user: req.session.passport, isLogged: true});
    }else{
        res.send({user:{}, isLogged:false});
    }
}

exports.logout = function(req, res, next){
    req.session.destroy(function(err){
        console.log('User Logout');
        if(!err){
            res.send({destroy: true});
        }else{
            console.log(err);
        }
    })
}