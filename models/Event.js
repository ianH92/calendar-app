var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: {type: String, required: true, max: 150},
	created: {type: Date, required: true, default: Date.now},
	user: {type: Schema.Types.ObjectId, required: true},
	priority: {type: Number, min: 1, max: 5, default: 5},
	due: {type: Date, min: Date.now},
	description: {type: String, max: 250},
});

EventSchema.virtual('daysLeft').get(function() {
	let startYear = this.created.year;
	let endYear = this.due.year;
	
	let startMonth = this.created.month;
	let endMonth = this.due.month;
	
	let startDay = this.created.day;
	let endDay = this.due.day;
	
	let days = 0;
	
	let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
	let leapYears = [2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048];
	
	while(startYear !== endYear || startMonth !== endMonth || startDay !== endDay) {
		//If there are still days in the month
		if(startDay > months[startMonth]) {
			//If month is February
			if(startMonth === 1) {
				/*Check if a leap year. Testing if year is divisible by 4 detects every leap
				year up to the year 2096.
				*/
				if(startYear % 4 === 0) {
					if(startDay > 29) {
						startMonth = (startMonth + 1);
						startDay = 
					}
				}
			}
		}
	}
});

daysLeft(2018, 0, 01, 2018, 0, 01); //0
daysLeft(2018, 0, 01, 2018, 0, 02); //1
daysLeft(2018, 0, 01, 2018, 0, 27); //26
daysLeft(2018, 0, 01, 2018, 1, 28); //58
daysLeft(2018, 0, 01, 2019, 0, 01);//365
daysLeft(2018, 0, 01, 2020, 1, 29);//789
daysLeft(2017, 0, 01, 2096, 11, 31);//29,219
daysLeft(2022, 5, 18, 2022, 9, 30);//134
daysLeft(2020, 5, 18, 2020, 9, 30);//134
daysLeft(2017, 1, 1, 2017, 1, 28);//27
daysLeft(2019, 11, 31, 2020, 0, 1);//1
daysLeft(2017, 10, 2, 2017, 11, 28);//56

/* Method assumes a valid date is passed and that the end date is greater than or
equal to the start date.
*/
function daysLeft(startYear, startMonth, startDay, endYear, endMonth, endDay) {
	
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
	
	console.log(' ');
	console.log('days left = ' + days);
	console.log(' ');
}