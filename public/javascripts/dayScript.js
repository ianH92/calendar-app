let events = document.getElementsByClassName('event');

for(let i = 0; i < events.length; i++) {
	let id = events[i].getAttribute('id');
	
	events[i].addEventListener('click', () => {
		console.log('here hree');
		window.location.href = ('/events/' + id);
	});
}