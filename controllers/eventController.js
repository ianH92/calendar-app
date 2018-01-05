var Event = require('../models/Event.js');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.eventDisplay = function(req, res) {

	var id = req.params.eventId;
	
	Event.findById(id, function(err, eventDetails) {
		if(err) { 
			res.render('error at event display', {error: err});
		} else {
			res.render('event',
				{name: eventDetails.name, priority: eventDetails.priority, 
				due: eventDetails.eventDate, description: eventDetails.description
			});
		}
	});
};

exports.createEvent = function(req, res) {
	res.render('createEvent');
}

exports.createEventPost = [
	body('name', 'Name for Event required').isLength({min: 3, max: 80}).withMessage('Event Name' +
		 ' must be longer than 2 characters and shorter than 81 characters.').trim(),
	body('priority').optional({checkFalsy: true}).trim(),
	body('eventDate').optional({checkFalsy: true}).isISO8601().withMessage('Valid Event date required'),
	body('description').optional({checkFalsy: true}).trim(),
	
	sanitizeBody('name').trim().escape(),
	sanitizeBody('priority').trim().escape(),
	sanitizeBody('eventDate').trim().escape(),
	sanitizeBody('description').trim().escape(),
	
	function(req, res, next) {
		let errors = validationResult(req);
		
		if(errors.isEmpty()) {
			let newEvent = new Event({
				name: req.body.name,
				user: '5a444deae24862450047baab',
				priority: req.body.priority,
				eventDate: req.body.date,
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