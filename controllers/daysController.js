var Event = require('../models/Event.js');

exports.dayDisplay = function(req, res) {
	let user = "5a444deae24862450047baab";
	
	let year = req.params.year;
	let month = req.params.month - 1;
	let day = req.params.day;
	
	let minDate = new Date(Date.UTC(year, month, day));
	let maxDate = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
	
	console.log('mindate = ' + minDate);
	console.log('maxdate = ' + maxDate);
	
	Event.find({
		user: user, 
		eventDate: { $gte: minDate, $lte: maxDate }
	}, 'name eventDate priority description')
	.sort({eventDate: +1})
	.exec(function(error, event_list) {
		if(error) { console.log('error'); }
		
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 
				  'July', 'August', 'September', 'October', 'November', 'December'];
				  
		console.log('num events = ' + event_list.length);
		console.log('num events = ' + event_list.length);
		for(let i = 0; i < event_list.length; i++) {
			console.log(event_list[i].eventDate);
		}
		//res.render('dayView', {title: (months[month] + ' ' + day + ', ' + year), events: event_list});
	});
}