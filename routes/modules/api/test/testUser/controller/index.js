exports.secret = function(req, res){
	console.log(req.user)
	res.json({secret: "User_secrert", user: req.user})
}