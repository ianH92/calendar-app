var Event = require('../models/Event.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.eventDisplay = function(req, res) {

	var id = req.params.eventId;
	
	Event.findById(id, function(err, eventDetails) {
		if(err) { 
			res.render('error at event display', {error: err});
		} else {
			let d = (eventDetails.eventDate === null) ? null : eventDetails.eventDate.toUTCString();
			
			//Check if the event requested belongs to the authenticated user
			if(req.user.id == eventDetails.user) {
				res.render('event',
					{title: 'Event Calendar', name: eventDetails.name, priority: eventDetails.priority, 
					date: d, description: eventDetails.description
				});
			} else {
				res.send('This event does not belong to this user.');
			}
		}
	});
};

exports.createEvent = function(req, res) {
	res.render('createEvent', {title: 'Event Calendar'});
}

exports.createEventPost = [
	body('name', 'Name for Event required').isLength({min: 3, max: 80}).withMessage('Event Name' +
		 ' must be longer than 2 characters and shorter than 81 characters.').trim(),
	body('priority').optional({checkFalsy: true}).trim(),
	body('date').optional({checkFalsy: true}).isISO8601().withMessage('Valid Event date required'),
	body('description').optional({checkFalsy: true}).trim(),
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
				if(error) { console.log('Error at event save'); } 
				res.redirect(savedEvent.url);
			});
		} else {
			res.render('error', {error: errors.array()});
			return;
		}
	}
];