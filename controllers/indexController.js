var Events = require('../models/Event.js');

exports.homePage = function(req, res) {
	let now = new Date();
	let year = now.getFullYear();
	
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 
				  'July', 'August', 'September', 'October', 'November', 'December'];
	let abbrMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
						'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let month = now.getMonth();
	let pMonth = ((month - 1) === -1) ? 11 : (month - 1);
	let nMonth = ((month + 1) === 12) ?  0 : (month + 1);
	
	
	res.render('home', {prevMonth: abbrMon[pMonth], month: months[month] + ' ' + year, nextMonth: abbrMon[nMonth]});
}