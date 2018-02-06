/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Controller for POST and GET requests to '/todo' to retrieve user calendar data.
 */

var Event = require('../models/Event.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/* Display a requested todo.
 */
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

/* Render the create todo view.
 */
exports.createTodo = function(req, res) {
	res.render('createTodo');
};

/* Handle a POST request to '/todo/createTodo'. Create the todo and save it to the database.
 */
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

exports.deleteTodo = function(req, res, next) {
	Event.findByIdAndRemove(req.params.todoId, function(error) {
		if(error) {
			res.render('error', {error: err});
		}
		res.redirect('/home');
	});
};