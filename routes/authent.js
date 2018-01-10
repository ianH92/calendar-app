module.exports = {
	authenticate: function(req, res, next) {
		if(req.isAuthenticated()) {
			console.log('authentsdfsdfsfsdfdfsdfsdfsdfsdf');
			next();
		} else {
			console.log('skdnflskdfsdlkfjasdlfkjsdlfkjsadflkasjdflkdsjf');
			res.redirect('/login');
		}
	}
};