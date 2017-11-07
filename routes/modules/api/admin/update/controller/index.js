var User = require('../../../../../../models/users');
var Meter = require('../../../../../../models/meters');

exports.update_user = function(req, res){
    var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
            User.update({_id:post._id}, {$set: post.data}, function(err, meter){
            if(err){
                console.log(err);
                res.json({err: err}).status(500)
            }
            else 
                res.json({message: "Succefuly updated", user: user}).status(200);       
            
            })
    }
}

exports.update_meter = function(req, res){
    var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
            Meter.update({_id:post._id}, {$set: post.data}, function(err, meter){
            if(err){
                console.log(err);
                res.json({err: err}).status(500)
            }
            else 
                res.json({message: "Succefuly updated", meter: meter}).status(200);       
            
            })
    }
}