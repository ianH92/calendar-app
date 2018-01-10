var User = require('../models/User.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bcrypt = require('bcrypt');

exports.signup = [
	body('username', 'Username is required').isLength({min: 3, max: 100}).withMessage('Username' +
		 ' must be longer than 2 characters and shorter than 101 characters.').trim(),
	body('password', 'Password is required').isLength({min: 8, max: 100}).withMessage('Password' +
		' must be longer than 7 characters and shorter than 101 characters.').trim(),
	
	sanitizeBody('username').trim().escape(),
	sanitizeBody('password').trim().escape(),

	function(req, res, next) {
		let errors = validationResult(req);
		
		if(!errors.isEmpty()) {
			res.render('signup', {errors: errors.array()});
			return;
		}
		
		User.findOne({username: req.body.username}, function(error, user) {
			if(error) { console.log('error at signup'); }
			
			if(user === null) {
				
				bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
					let newUser = new User({
						username: req.body.username,
						passwordHash: hashedPassword,
					});
					
					newUser.save(function(error, savedUser) {
						if(error) { 
							res.render('signup', { error: 'save error'});
							return;
						} 
						res.render('login', {msg: 'Signup successful, you can log in now'});
						return;
					});
				});
			} else {
				res.render('signup', {error: 'username already exists'});
				return;
			}
		});
	}
];