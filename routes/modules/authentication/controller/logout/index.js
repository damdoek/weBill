var Tokens = require('../../../../../models/sessions')
exports.logout = function(req, res){
  Tokens.remove({u_id: req.user._id}, function(err){
  	 if(err) return res.json({err: err}).status(500)
  	 else req.logout();
  	 return res.json({msg:'logout succefully'}).status(200)
  })
  
  //res.redirect('/');
}