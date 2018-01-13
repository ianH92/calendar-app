var Event = require('../models/Event.js');

exports.dayDisplay = function(req, res) {
	let user = req.user.id;
	
	let year = req.params.year;
	let month = req.params.month;
	let day = req.params.day;
	
	let minDate = new Date(Date.UTC(year, month, day));
	let maxDate = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
	
	Event.find({
		user: user, 
		eventDate: { $gte: minDate, $lte: maxDate }
	}, 'name eventDate priority description')
	.sort({eventDate: +1})
	.exec(function(error, event_list) {
		if(error) { 
			res.render('error', {error: error});
			return;
		}
		
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 
				  'July', 'August', 'September', 'October', 'November', 'December'];
				  
		res.render('dayView', {dayName: (months[month] + ' ' + day + ', ' + year),
							   events: event_list});
	});
}