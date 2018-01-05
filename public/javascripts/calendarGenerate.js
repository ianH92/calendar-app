let xmlReq = new XMLHttpRequest();
let now = new Date();

xmlReq.open('GET', ('/getcalendar/' + now.getFullYear() + '/' + now.getMonth()));
xmlReq.responseType = 'json';
xmlReq.send();

xmlReq.onload = function() {
	let cal = xmlReq.response.calendar;
	
	for(let i = 0; i < cal.length; i++) {
		let day = cal[i];
		let td = document.getElementById(i + 1);
		
		let p = document.createElement('p');
		p.textContent = day['day'];
		td.appendChild(p);
		
		for(let j = 0; j < day['events'].length; j++) {
			let des = document.createElement('p');
			des.textContent = day['events'][j].name;
			td.appendChild(des);
		}
		
		if(day['currMonth'] === true) {
			td.setAttribute('class', 'full active');
		} else {
			td.setAttribute('class', 'full notactive');
		}
	}
}