/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Controller for POST requests to '/events/<year>/<month>/<day>' to retrieve user calendar data.
 */

var Event = require('../models/Event.js');

/* Handle a POST request to '/events/:year/:month/:day' by searching database for events that occur
 * that month and sending them in JSON.
 */
exports.createCalendarJSON = function(req, res) {
	
	let user = req.user.id;

	let year = req.params.year;
	let month = req.params.month;
	let today = req.params.day;
	
	let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let maxDay = (month == 1 && year % 4 == 0) ? 29 : daysInMonth[month];
	
	let minDate = new Date(year, month, 1);
	let maxDate = new Date(year, month, maxDay);
		
	Event.find({
		user: user, 
		eventDate: { $gte: minDate, $lte: maxDate }
	}, 'name eventDate priority description')
	.sort( { eventDate: +1 })
	.exec(function(error, event_list) {
		if(error) { 
			res.render('error', {error: error});
		}
		if(event_list === null) { event_list = []; }
		
		let obj = new Object();
		obj['calendar'] = [];

		let prevMonth = ((month - 1) === -1) ? 11 : (month - 1);
		let maxDayPrevMonth = (prevMonth === 1 && year % 4 === 0) ? 29 : daysInMonth[prevMonth];
		
		//Add the leftover days from the previous month
		let first = minDate.getDay();
		for(let i = 0; i < first; i++) {
			
			let temp = new Object();
			temp['day'] = maxDayPrevMonth;
			temp['events'] = [];
			temp['currMonth'] = false;
			temp['today'] = false;
			
			obj['calendar'].unshift(temp);
			maxDayPrevMonth--;
		}
		
		//Assign the events to their proper day
		let dayEvents = new Object();
		for(let i = 1; i <= 31; i++) {
			dayEvents[i] = [];
		}
		
		for(let i = 0; i < event_list.length; i++) {
			dayEvents[event_list[i].eventDate.getUTCDate()].push(event_list[i]);
		}
		
		//Add the days and events from the current month
		for(let i = 1; i <= maxDay; i++) {
			let temp = new Object();
			temp['day'] = i;
			//Add the events for the current month
			temp['events'] = dayEvents[i];
			temp['currMonth'] = true;
			
			temp['today'] = (i == today) ? true : false;
			
			obj['calendar'].push(temp);
		}
		
		//Add the spillover days from the next month
		let daysOfNextMonth = (6 - maxDate.getDay());
		for(let i = 1; i <= daysOfNextMonth; i++) {
			let temp = new Object();
			temp['day'] = i;
			temp['events'] = [];
			temp['currMonth'] = false;
			temp['today'] = false;
			
			obj['calendar'].push(temp);
		}
		
		res.send(JSON.stringify(obj));
	});
}