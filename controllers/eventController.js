var Event = require('../models/Event.js');

exports.eventDisplay = function(req, res) {

	var id = req.params.eventId;
	
	Event.findById(id, function(err, eventDetails) {
		if(err) { 
			res.render('error', {error: err});
		} else {
			res.render('event',
				{name: eventDetails.name, priority: eventDetails.priority, 
				due: eventDetails.eventDate, description: eventDetails.description
			});
		}
	});
};