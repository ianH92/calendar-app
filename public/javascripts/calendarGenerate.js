let xmlReq = new XMLHttpRequest();
let now = new Date();

xmlReq.open('GET', ('/' + now.getFullYear() + '/' + now.getMonth()));
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
		
		if(day['currMonth'] === true) {
			td.setAttribute('class', 'full active');
		} else {
			td.setAttribute('class', 'full notactive');
		}
	}
}