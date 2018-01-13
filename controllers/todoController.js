var Event = require('../models/Event.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.displayTodo = function(req, res) {
	let id = req.params.todoID;
	
	Event.findById(id, function(err, todoDetails) {
		if(err) { 
			res.render('error at event display', {error: err});
		} else {
			
			//Check if todo belongs to the authenticated user
			if(req.user.id == todoDetails.user) {
				res.render('todo',
					{name: todoDetails.name, priority: todoDetails.priority, 
					description: todoDetails.description
				});
			} else {
				res.send('This todo does not belong to the user');
			}
		}
	});
};

exports.createTodo = function(req, res) {
	res.render('createTodo');
};

exports.createTodoPost = [
	body('name', 'Name for ToDo required').isLength({min: 3, max: 80}).withMessage('ToDo Name' +
		 ' must be between 3-80 characters in length.').trim(),
	body('priority').optional({checkFalsy: true}).trim(),
	body('description').optional({checkFalsy: true}).isLength({min: 0, max: 250}).withMessage('ToDo ' +
		'description must be between 0-250 characters in length.').trim(),
	
	sanitizeBody('name').trim().escape(),
	sanitizeBody('priority').trim().escape(),
	sanitizeBody('description').trim().escape(),
	
	
	function(req, res, next) {
		let errors = validationResult(req);
		
		if(errors.isEmpty()) {
			let newEvent = new Event({
				name: req.body.name,
				user: req.user.id,
				priority: req.body.priority,
				description: req.body.description,
			});
			
			newEvent.save(function(error, savedEvent) {
				if(error) { 
					res.render('createTodo', {error: error});
					return;
				} 
				res.redirect(savedEvent.url_todo);
			});
		} else {
			console.log('thhthht');
			res.render('createTodo', {errors: errors.array()});
			return;
		}
	}
];