var Chat = require('../models/chat');
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');
var _ = require('lodash');

exports.createSpeaking = function(req, res, next){
    if(req.body.receiver !== 'general'){
        async.waterfall([
            function(callback){
                Chat.findOne({$or:
                    [
                        {$and:
                            [
                                {sender: req.session.passport.user._id.toString()},
                                {receiver: req.body.receiver}
                            ]
                        },
                        {$and:
                            [
                                {receiver: req.session.passport.user._id.toString()},
                                {sender: req.body.receiver}
                            ]
                        }
                    ]
                })
                .populate('sender')
                .populate('receiver')
                .exec(function(err, chat){
                    callback(null, chat);
                });         
            },
            function(chat, callback){
                if(chat){
                    var data = whoIsMe(req.session.passport.user, chat);
                    callback(null, data);
                }else{
                    var chat = new Chat({
                        sender: req.session.passport.user._id.toString(),
                        receiver: req.body.receiver,
                        type: 'individual'
                    });
                    chat.save(function(err, chat){
                        if(!err){
                            async.waterfall([
                                function(cb){
                                    Chat.populate(chat, {path: 'receiver', model: 'User'}, function(err, r1){
                                        cb(null, r1);
                                    });
                                },
                                function(r1, cb){
                                    Chat.populate(r1, {path: 'sender', model: 'User'}, function(err, r2){
                                        cb(null, r2);
                                    });
                                }
                            ], function(err, results){
                                var data = whoIsMe(req.session.passport.user, results);
                                callback(null, data);
                            });
                        }
                    });
                }
            }
        ], function(err, results){
            res.send(results);
        });
    }else{
        async.waterfall([
            function(callback){
                Chat.findOne({type: 'general'})
                .exec(function(err, chat){
                    if(!err){
                        callback(null, chat);
                    }
                });
            },
            function(chat, callback){
                if(chat){
                    callback(null, chat);
                }else{
                    var chat = new Chat({
                        type: 'general'
                    });
                    chat.save(function(err, chat){
                        callback(null, chat);
                    });
                }
            }
        ], function(err, results){
            res.send({chat: results});
        });
    }
}

function whoIsMe(user, chat){
    var data = {chat: chat, me: {}, other: {}};
    if(chat.receiver._id == user._id){
        data.me = chat.receiver;
        data.other = chat.sender;
    }else{
        data.me = chat.sender;
        data.other = chat.receiver;
    }
    return data;
}