var Event = require('../models/Event.js');

exports.createCalendarJSON = function(req, res) {
	
	let user = "5a444deae24862450047baab";

	let n = new Date(2018, 00, 01);
	let year = n.getFullYear();
	let month = n.getMonth();
	
	let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let maxDay = (month === 1 && year % 4 === 0) ? 29 : daysInMonth[month];
	
	let minDate = new Date(year, month, 1);
	let maxDate = new Date(year, month, maxDay);
		
	Event.find({
		user: user, 
		eventDate: { $gte: minDate, $lte: maxDate }
	}, 'name eventDate priority description')
	.sort( { eventDate: +1 })
	.exec(function(error, event_list) {
		if(error) { console.log('error'); }
		
		let obj = new Object();
		obj['calendar'] = [];

		let prevMonth = ((month - 1) === -1) ? 11 : (month - 1);
		let maxDayPrevMonth = (prevMonth === 1 && year % 4 === 0) ? 29 : daysInMonth[prevMonth];
		
		let first = minDate.getDay();
		for(let i = 0; i < first; i++) {
			
			let temp = new Object();
			temp['day'] = maxDayPrevMonth;
			temp['events'] = [];
			
			obj['calendar'].unshift(temp);
			maxDayPrevMonth--;
		}
		
		//Assign the events to their proper day
		let dayEvents = new Object();
		for(let i = 1; i <= 31; i++) {
			dayEvents[i] = [];
		}
		
		for(let i = 0; i < event_list.length; i++) {
			dayEvents[event_list[i].eventDate.getDate()].push(event_list[i]);
			
			console.log('-------');
			console.log(i);
			console.log(event_list[i].eventDate);
			console.log(event_list[i].eventDate.getDate());
			console.log('-------');
		}
		
		for(let i = 1; i <= maxDay; i++) {
			let temp = new Object();
			temp['day'] = i;
			//Add the events for the current month
			temp['events'] = dayEvents[i];
			
			obj['calendar'].push(temp);
		}
		
		
		let daysOfNextMonth = (6 - maxDate.getDay());
		for(let i = 1; i <= daysOfNextMonth; i++) {
			let temp = new Object();
			temp['day'] = i;
			temp['events'] = [];
			
			obj['calendar'].push(temp);
		}
		
		console.log(JSON.stringify(obj));
	});
	
}