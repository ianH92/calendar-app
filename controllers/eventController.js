var Event = require('../models/Event.js');

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

exports.createEventPost = function(req, res) {
	
	let userid = '5a444deae24862450047baab';
	
	let userDate = req.body.date;
	console.log(userDate);
	//console.log(userDate.toUTCString());
	
	/*
	let newEvent = new Event({
		name: req.body.name,
		user: userid,
		priority: req.body.priority,
		eventDate: req.body.date,
		description: req.body.description,
	});
	
	newEvent.save(function(error, savedEvent) {
		if(error) {
			console.log('Error at event save');
		}
		res.redirect(savedEvent.url);
	});
	*/
}