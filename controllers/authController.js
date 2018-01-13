/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Controller for sign up POST requests.
 */

var User = require('../models/User.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bcrypt = require('bcrypt');

/* Handle a POST request to '/signup' by sanitizing entered data and creating the user in the
 * database.
 */
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
			if(error) { 
				res.render('signup', { error: 'Database query error, try again.' });
			}
			
			if(user === null) {
				
				bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
					let newUser = new User({
						username: req.body.username,
						passwordHash: hashedPassword,
					});
					
					newUser.save(function(error, savedUser) {
						if(error) { 
							res.render('msg', { error: 'Error saving user to database.'});
							return;
						}
						//User registered
						req.flash('msg', 'Sign up was successful, you may now log in.');
						res.redirect('/login');
						return;
					});
				});
			} else {
				res.render('signup', {error: 'Error: Username already exists.'});
				return;
			}
		});
	}
];