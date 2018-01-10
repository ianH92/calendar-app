var User = require('../models/User.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.signup = [
	body('username', 'Username is required').isLength({min: 3, max: 100}).withMessage('Username' +
		 ' must be longer than 2 characters and shorter than 101 characters.').trim(),
	body('password', 'Password is required').isLength({min: 8, max: 100}).withMessage('Password' +
		' must be longer than 7 characters and shorter than 101 characters.').trim(),
	
	sanitizeBody('username').trim().escape(),
	sanitizeBody('password').trim().escape(),

	function(req, res, next) {
		
		User.findOne({username: req.body.username}, function(error, user) {
			if(error) { console.log('error at signup'); }
			if(user === null) {
				let newUser = new User({
					username: req.body.username,
					password: req.body.password,
				});
				
				newUser.save(function(error, savedUser) {
					if(error) {
						res.render('/signup');
					} else {
						res.render('/login');
					}
				});
			} else {
				res.render('signup');
			}
		});
	}
];