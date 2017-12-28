var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: {type: String, required: true, max: 150},
	created: {type: Date, required: true, default: Date.now},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	priority: {type: Number, min: 1, max: 5, default: 5},
	eventDate: {type: Date, min: Date.now},
	description: {type: String, max: 250},
});

EventSchema.virtual('daysLeft').get(function() {
	let startYear = this.created.year;
	let endYear = this.eventDate.year;
	
	let startMonth = this.created.month;
	let endMonth = this.eventDate.month;
	
	let startDay = this.created.day;
	let endDay = this.eventDate.day;
	
	let days = 0;
	let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
	
	while(startYear !== endYear || startMonth !== endMonth || startDay !== endDay) {

		if(startDay >= daysInMonth[startMonth]) {
			
			if(startMonth === 1) {
				/*Check if a leap year. Testing if year is divisible by 4 detects every leap
				year up to the year 2096.
				*/
				if(startYear % 4 === 0) {
					if(startDay >= 29) {
						startMonth = (startMonth + 1);
						startDay = 1;
					} else {
						startDay++;
					}
				} else {
					startMonth++;
					startDay = 1;
				}
			} else {
				startMonth++;
				startDay = 1;
			}
		} else {
			startDay++;
		}
		
		if(startMonth > 11) {
			startMonth = 0;
			startYear++;
		}
		days++;
	}
	return days;
});

EventSchema.virtual('url').get(function() {
	return '/home/events/' + this._id;
});

module.exports = mongoose.model('Event', EventSchema);