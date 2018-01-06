let due = document.getElementById('due');
let left = document.getElementById('left');
let endDate = new Date(due.textContent);

if(this.due === null) { 
	//Do Nothing
} else {
	let startDate = new Date();

	let startYear = startDate.getFullYear();
	let endYear = endDate.getUTCFullYear();

	let startMonth = startDate.getMonth();
	let endMonth = endDate.getUTCMonth();

	let startDay = startDate.getDate();
	let endDay = endDate.getUTCDate();
	
	let reformattedDay = new Date(endYear, endMonth, endDay);
	due.textContent = reformattedDay.toString();

	let negative = false;
	if(endYear <= startYear && endMonth <= startMonth && endDay < startDay) {
		let temp = startYear;
		startYear = endYear;
		endYear = temp;
		
		temp = startMonth;
		startMonth = endMonth;
		endMonth = temp;
		
		temp = startDay;
		startDay = endDay;
		endDay = temp;
		
		negative = true;
	}

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

	days = (negative) ? (days * -1) : days;
	left.textContent = days;
}