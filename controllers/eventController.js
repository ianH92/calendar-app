/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Controller for POST and GET requests to '/events'
 */

var Event = require('../models/Event.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/* Display information about a requested event
 */
exports.eventDisplay = function(req, res) {

	var id = req.params.eventId;
	
	Event.findById(id, function(err, eventDetails) {
		if(err) { 
			res.render('error', {error: err});
		} else {
			let d = (eventDetails.eventDate === null) ? null : eventDetails.eventDate.toUTCString();
			
			//Check if the event requested belongs to the authenticated user
			if(req.user.id == eventDetails.user) {
				res.render('event',
					{name: eventDetails.name, priority: eventDetails.priority, 
					date: d, description: eventDetails.description
				});
			} else {
				res.render('event', {error: 'This event does not belong to this user.'});
			}
		}
	});
};

/* Render create event view
 */
exports.createEvent = function(req, res) {
	res.render('createEvent');
}

/* Handle POST request to '/events/createEvent'. Create the Event and save it to the database.
 */
exports.createEventPost = [
	body('name', 'Name for Event required').isLength({min: 3, max: 80}).withMessage('Event Name' +
		 ' must be between 3-80 characters in length.').trim(),
	
	body('priority').optional({checkFalsy: true}).trim(),
	
	body('date').optional({checkFalsy: true}).isISO8601().withMessage('Valid Event date required'),
	
	body('description').optional({checkFalsy: true}).isLength({min: 0, max: 250}).withMessage('Event ' +
		'Description must be between 0-250 characters in length.').trim(),
	
	body('currdate').optional({checkFalsy: true}).trim(),
	
	sanitizeBody('name').trim().escape(),
	sanitizeBody('priority').trim().escape(),
	sanitizeBody('date').trim().escape(),
	sanitizeBody('description').trim().escape(),
	sanitizeBody('currdate').trim().escape(),
	
	
	function(req, res, next) {
		let errors = validationResult(req);
		
		if(errors.isEmpty()) {
			let newEvent = new Event({
				name: req.body.name,
				user: req.user.id,
				priority: req.body.priority,
				eventDate: req.body.date,
				created: req.body.currdate,
				description: req.body.description,
			});
			
			newEvent.save(function(error, savedEvent) {
				if(error) {
					res.render('createEvent', {error: error}); 
					return;
				}
				
				res.redirect(savedEvent.url);
			});
		} else {
			res.render('createEvent', {errors: errors.array()});
			return;
		}
	}
];

exports.deleteEvent = function(req, res, next) {
	Event.findByIdAndRemove(req.params.eventId, function(error) {
		if(error) {
			res.render('error', {error: err});
		}
		res.redirect('/home');
	});
};