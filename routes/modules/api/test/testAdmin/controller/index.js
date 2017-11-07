exports.secret = function(req, res){
	console.log(req.user)
	res.json({secret: "Xubndhjs_jekj123", user: req.user})
}