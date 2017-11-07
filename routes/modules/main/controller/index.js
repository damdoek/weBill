exports.home = function(req, res, next) {

	console.log(req.isAuthenticated())
  res.render('index', { title: 'Express' });
}