var TimeLine = require('../models/timeline');
var Task = require('../models/task');
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('lodash');
var async = require('async');

exports.TaskEnded = function(req, res, next){
    var items = function(task, callback){
        var timeLine = new TimeLine({
            user: ObjectId(task.user.toString()),
            task: ObjectId(task._id.toString()),
            action: 'Task Ended',
            description: task.description,
            type: 'task'
        });

        timeLine.save(function(err, item){
            if(!err){
                console.log('!Accion Guardada');
                return callback(null, item);                
            }
        });
    }
    async.map(req.body.tasks, items, function(err, result){
        async.waterfall([
            function(callback){
                TimeLine.populate(result, {path: 'user', model: 'User'}, function(err, items){
                    callback(null, items);
                });
            },
            function(items, callback){
                TimeLine.populate(items, {path: 'task', model: 'Task'}, function(err, items){
                    callback(null, items);
                });
            }
        ],function(err, data){
            if(!err){
                console.log(data);
            }else{
                console.log(err);
            }
        });
    });
}

exports.resourceSent = function(req, res, next){
    var timeLine = new TimeLine({
        resource: req.body.resource._id,
        action: 'Compartio Recurso',
        description: req.body.resource.subject,
        type: 'resource'
    });

    timeLine.save(function(err, resource){
        if(!err){
            console.log('!Accion Guardada');
            console.log(resource);
        }
    });
}

exports.getTimeLine = function(req, res, next){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDay();
    console.log('Fecha: ', new Date(year, month, day));

    TimeLine.find({date: {$gte: new Date(year, month, day)}})
    .populate('user task resource')
    .exec(function(err, docs){
        if(!err){
            TimeLine.populate(docs, {path: 'resource.sender', model: 'User'}, function(err, items){
                res.send(items);
            });
        }else{
            console.log(err);
        }
    });
}