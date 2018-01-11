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
					{title: 'Event Calendar', name: todoDetails.name, priority: todoDetails.priority, 
					description: todoDetails.description
				});
			} else {
				res.send('This todo does not belong to the user');
			}
		}
	});
};

exports.createTodo = function(req, res) {
	res.render('createTodo', {title: 'Event Calendar'});
};

exports.createTodoPost = [
	body('name', 'Name for ToDo required').isLength({min: 3, max: 80}).withMessage('ToDo Name' +
		 ' must be longer than 2 characters and shorter than 81 characters.').trim(),
	body('priority').optional({checkFalsy: true}).trim(),
	body('description').optional({checkFalsy: true}).trim(),
	
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
				if(error) { console.log('Error at event save'); } 
				res.redirect(savedEvent.url_todo);
			});
		} else {
			res.render('error', {error: errors.array()});
			return;
		}
	}
];