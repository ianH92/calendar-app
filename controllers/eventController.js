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

exports.createEvent = function(req, res) {
	let now = new Date();
	let minDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	
	res.render('createEvent', {minDate: minDate});
}

exports.createEventPost = function(req, res) {
	console.log('name = ' + req.body.name);
	console.log('priority = ' + req.body.priority);
	console.log('event date = ' + req.body.date);
	console.log('description = ' + req.body.description);
	
	let userid = '5a444deae24862450047baab';
	
	let newEvent = new Event({
		name: req.body.name,
		user: userid,
		priority: req.body.priority,
		eventDate: req.body.date,
		description: req.body.description,
	});
	
	newEvent.save(function(error, savedEvent) {
		if(error) {
			console.log('Error');
		}
		res.redirect(savedEvent.url);
	});
}