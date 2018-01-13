/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Authentication function for passport.js
 */

module.exports = {
	authenticate: function(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/login');
		}
	}
};