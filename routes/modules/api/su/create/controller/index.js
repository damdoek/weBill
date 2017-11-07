var Admin = require('../../../../../../models/admins');

exports.create = function(req, res){
	var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
    	var admin = new Admin(post);
    	admin.save(function(err){
    		if(err){
    			console.log(err);
    			res.json({err: err}).status(500)
    		}
            else 
    		  res.json({message: "Succefuly saved", user: admin}).status(200);
    	})
    }
}

