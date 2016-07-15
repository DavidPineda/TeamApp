var Resource = require('../models/resource');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var async = require('async');

var newResource = new Resource({});

exports.saveResource = function(req, res, next){
    async.series({
        files: function(callback){
            if(req.files.file.lenght > 0){
                var result = _.map(req.files.file, function(file, i){
                    return saveFiles(req, res, i, file)
                });
                callback(null, result);
            }else{
                callback(null, saveFiles(req, res, 0, req.files.file));
            }
        },
        data: function(callback){
            var data = {
                sender: ObjectId(req.session.passport.user._id.toString()),
                receiver: req.body.receiver.split(','),
                subject: req.body.subject      
            }
            callback(null, data);
        }
    }, function(err, result){
        if(!err){
            saveResource(result, function(resource){
                res.body.resource = resource;
                res.send(resource);
                next();
            });
        }else{
            res.send({msg: 'Fallo'});
            console.log(err);
        }
    });
}

exports.getResourcesReceived = function(req, res, next){
    Resource.find({receiver: req.session.passport.user.username})
    .populate('sender')
    .exec(function(err, resources){
        if(err){
            console.log(err);
        }else{
            res.send(resources);
        }
    });
}

exports.getResourcesSent = function(req, res, next){
    console.log('Send Respurces');
    Resource.find({sender: req.session.passport.user._id})
    .populate('sender')
    .exec(function(err, resources){
        if(err){
            console.log(err);
        }else{
            res.send(resources);
        }
    });
}

exports.getDetailsResource = function(req, res, next){
    Resource.findOne({_id: req.params.idResource})
    .populate('sender')
    .exec(function(err, resource){
        if(!err){
            res.send(resource);
        }else{
            console.log(resource);
        }
    })
}

function saveFiles(req, res, i, file){
    var root = path.dirname(require.main.filename);
    var originalFileName = file.originalFilename.split('.');
    var ext = originalFileName[originalFileName.length - 1];
    var fileName = newResource._id.toString() + '_' + i + '.' + ext;
    var newPath = root + '/public/resources/' + fileName;
    var newFile = new fs.createWriteStream(newPath);
    var oldFile = new fs.createReadStream(file.path);
    var bytesAll = req.headers['content-length'];
    var bytesUpload = 0;

    oldFile.pipe(newFile);
    oldFile.on('data', function(chunk){
       bytesUpload += chunk.length;
       var progress = (bytesUpload / bytesAll) * 100;
       //res.write('progress: ' + parseInt(progress, 10) + '%\n');
       res.end();
    });

    oldFile.on('end', function(){
        console.log('Carga Completada');
        res.end('Carga Completa');
    });
    return fileName;
}

function saveResource(result, callback){
    if(Array.isArray(result.files)){
        newResource.files = result.files;
    }else{
        newResource.files.push(result.files);
    }
    newResource.subject = result.data.subject;
    newResource.receiver = result.data.receiver;
    newResource.sender = result.data.sender;
    newResource.save();
    callback(newResource); 
}