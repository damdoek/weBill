var fs = require('fs');
exports.get = function(req,res){
	fs.readFile('./routes/modules/api/test/testlouis/db.js', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	    res.json({err:err}).status(500)
	  }
	  else{
	  	var db = JSON.parse(data)
	  	console.log(data);
	  	res.render('louis', {db:db});
	  }
	  
	});
}

exports.push = function(req,res){
	fs.readFile('./routes/modules/api/test/testlouis/db.js', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	    res.json({err:err}).status(500)
	  }
	  else{
	  	var db = JSON.parse(data)
	  	console.log(data);
	  	db.records.push(req.body.record)
	  	var str = JSON.stringify(db);
	  	fs.writeFile('./routes/modules/api/test/testlouis/db.js', str,function(err){
	  		 if (err) {
	  			    return console.log(err);
	  			    res.json({err:err}).status(500)
	  		 }
	  		 else{
	  		 	res.json({msg:"success", db:db}).status(200)
	  		 }
	  	})
	  		  }
	})
}