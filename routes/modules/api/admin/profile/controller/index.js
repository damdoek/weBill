var Admin = require('../../../../../../models/admins');

exports.profile = function(req, res){
    var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
            Admin.update({_id:post._id}, {$set: post.data}, function(err, meter){
            if(err){
                console.log(err);
                res.json({err: err}).status(500)
            }
            else 
                res.json({message: "Succefuly updated", user: user}).status(200);       
            
            })
    }
}