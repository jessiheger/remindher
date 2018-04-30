module.exports = function(req, res, next){
	if (!req.user) {
		req.flash('error', 'Please login to view this page!');
		res.redirect('/auth/login');
	}
	else {
		next();
	}
}
