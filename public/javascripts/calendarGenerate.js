let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();

let saveYear = year;
let saveMonth = month;
let saveDate = now.getDate();

let xmlReq = new XMLHttpRequest();
xmlReq.open('GET', ('/getcalendar/' + year + '/' + month + '/' + date));
xmlReq.responseType = 'json';
xmlReq.send();


let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
			  'October', 'November', 'December'];
let abbrMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let pMonth = ((month - 1) === -1) ? 11 : (month - 1);
let nMonth = ((month + 1) === 12) ?  0 : (month + 1);

let prevMonth = document.getElementById('prevMonth');
let currMonth = document.getElementById('currMonth');
let nextMonth = document.getElementById('nextMonth');

prevMonth.textContent = '< ' +abbrMon[pMonth];
currMonth.textContent =  months[month] + ' ' + year;
nextMonth.textContent = abbrMon[nMonth] + ' >';

prevMonth.addEventListener('click', function() {
	let xmlReq2 = new XMLHttpRequest();
	
	month--;
	month = (month === -1) ? 11 : month;
	
	year = (month === 11) ? (year - 1) : year;
	pMonth = (month === 0) ? 11 : (month - 1);
	nMonth = (month === 11) ? 0 : (month + 1);
	
	let url = '';
	if(month === saveMonth && year === saveYear) {
		url = ('/getcalendar/' + saveYear + '/' + saveMonth + '/' + saveDate);
	} else {
		url = ('/getcalendar/' + year + '/' + month + '/' + -1)
	}
	
	xmlReq2.open('GET', url);
	xmlReq2.responseType = 'json';
	xmlReq2.send();
	
	xmlReq2.onload = () => { genCal(xmlReq2.response.calendar); }
	
	prevMonth.textContent = '< ' +abbrMon[pMonth];
	currMonth.textContent =  months[month] + ' ' + year;
	nextMonth.textContent = abbrMon[nMonth] + ' >';
});

nextMonth.addEventListener('click', function() {
	let xmlReq2 = new XMLHttpRequest();
	
	month++;
	month = (month === 12) ? 0 : month;
	
	year = (month === 0) ? (year + 1) : year;
	pMonth = (month === 0) ? 11 : (month - 1);
	nMonth = (month === 11) ? 0 : (month + 1);
	
	let url = '';
	if(month === saveMonth && year === saveYear) {
		url = ('/getcalendar/' + saveYear + '/' + saveMonth + '/' + saveDate);
	} else {
		url = ('/getcalendar/' + year + '/' + month + '/' + -1)
	}
	
	xmlReq2.open('GET', url);
	xmlReq2.responseType = 'json';
	xmlReq2.send();
	
	xmlReq2.onload = () => { genCal(xmlReq2.response.calendar); }
	
	prevMonth.textContent = '< ' +abbrMon[pMonth];
	currMonth.textContent =  months[month] + ' ' + year;
	nextMonth.textContent = abbrMon[nMonth] + ' >';
});

var genCal = function(cal) {
	for(let i = 0; i < 42; i++) {
		let day = null;
		let td = document.getElementById(i + 1);
		
		if(!cal.hasOwnProperty(i)) {
			td.setAttribute('class', 'empty notactive');
			td.textContent = '';
			
			while(td.firstChild) {
				td.removeChild(td.firstChild);
			}
			
			continue;
		}
		
		day = cal[i];
		
		while(td.firstChild) {
			td.removeChild(td.firstChild);
		}
		
		td.textContent = day['day'];
		
		for(let j = 0; j < day['events'].length; j++) {
			let evnt = document.createElement('p');
			evnt.textContent = day['events'][j].name;
			td.appendChild(evnt);
		}
		
		if(day['currMonth'] === true) {
			if(day['today'] === true) {
				td.setAttribute('class', 'full active today');
			} else {
				td.setAttribute('class', 'full active');
			}
		} else {
			td.setAttribute('class', 'full notactive');
		}
	}
}

xmlReq.onload = function() {
	let cal = xmlReq.response.calendar;
	
	for(let i = 0; i < cal.length; i++) {
		let day = cal[i];
		let td = document.getElementById(i + 1);
		
		td.textContent = day['day'];
		
		for(let j = 0; j < day['events'].length; j++) {
			let evnt = document.createElement('p');
			evnt.textContent = day['events'][j].name;
			td.appendChild(evnt);
		}
		
		if(day['currMonth'] === true) {
			if(day['today'] === true) {
				td.setAttribute('class', 'full active today');
			} else {
				td.setAttribute('class', 'full active');
			}
			
			td.addEventListener('click', () => {
				window.location.href = '/day/' + year + '/' + month + '/' + td.firstChild.textContent;
			});
		} else {
			td.setAttribute('class', 'full notactive');
		}
	}
}