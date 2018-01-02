let xmlReq = new XMLHttpRequest();
let now = new Date();

xmlReq.open('GET', ('/' + now.getFullYear() + '/' + now.getMonth()));
xmlReq.responseType = 'json';
xmlReq.send();

xmlReq.onload = function() {
	let cal = xmlReq.response;
	
	console.log(cal);
	
	for(let i = 1; i <= cal.calendar.length; i++) {
		let currDay = document.getElementById(i);
		currDay.appendChild(document.createElement('p', cal['calendar'][i]['day']));
		
		for(let j = 0; j < cal['calendar'][i]['events'].length; j++) {
			currDay.appendChild(document.createElement('p', cal['calendar'][i]['events'][j].name));
		}
	}
}