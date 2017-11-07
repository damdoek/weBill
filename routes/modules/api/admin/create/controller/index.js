var User = require('../../../../../../models/users');
var Meter = require('../../../../../../models/meters');
var Counter = require('../../../../../../models/counter');
exports.create_user = function(req, res){
	var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
    	var user = new User(post);
        user.creation_date = Date.now()
            user.save(function(err){
            if(err){
                console.log(err);
                res.json({err: err}).status(500)
            }
            else 
    	        res.json({message: "Succefuly saved", user: user}).status(200);
            
            })
    }
}

exports.create_meter = function(req, res){
    var post = req.body;
    console.log(post);
    if (JSON.stringify(post).length > 1e6)
        req.connection.destroy();
    else {
        var meter = new Meter(post);
        Counter.find(function(err, result){
            if(err) {
                console.log("err:", err)
                return res.json({err: err}).status(500)
            }
            console.log("res: ",result)
            meter.identifier = "Meter_"+result[0].seq
            meter.creation_date = Date.now()
            meter.save(function(err){
                if(err){
                    console.log(err)
                    return res.json({err: err}).status(500)
                }
                else{
                    Counter.findByIdAndUpdate({_id: result[0]._id}, {$inc: {seq: 1}}, function(err, result){console.log(result)})
                    return res.json({message: "Succefuly saved", meter: meter}).status(200);       
                }
            
            })
        })
        
            
    }
}