var Task = require('../models/task');
var objectId = require('mongoose').Types.ObjectId;
var _ = require('lodash');

exports.saveTask = function(req, res, next){
    var task = new Task({
        description: req.body.description,
        user: req.session.passport.user._id.toString()
    });

    task.save(function(err, task){
        if(err){
            console.log('Error: ' + err);
            res.send({success: false, message: err});
        }else{
            console.log('Success Save');
            res.send({success: true, task: task});
        }
    });
}

exports.getTask = function(req, res, next){
    Task.find({user: req.session.passport.user._id.toString()})
    .exec(function(err, tasks){
        if(err){
            console.log('Error: ' + err);
        }else{
            res.send(tasks)
        }
    });
}

exports.saveTasksEnded = function(req, res, next){
    var ids = req.body.ids;
    Task.find({_id: {$in:ids}})
    .exec(function(err, tasks){
       if(err){
           console.log(err);
       }else{
           _.each(tasks, function(task){
               task.ended.status = true;
               task.ended.date = new Date();
               task.save();
           });
           req.body.tasks = tasks;
           res.send(tasks);
           //next();
       }
    });
}