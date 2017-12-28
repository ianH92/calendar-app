let mongoose = require('mongoose');

let User = require('./models/User.js');
let Events = require('./models/Event.js');
let dbPassword = require('./password.js');

let mongo = dbPassword.databasePassword();
mongoose.connect(mongo, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var d = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


User.findOne({'username' : 'testUser'}, function(err, user1) {
	if(err) { console.log('error finding'); }
	console.log('found user');
	
	let event1 = new Events({
		name: 'Pay Taxes',
		user: user1,
		priority: 1,
		eventDate: new Date(2018, 4, 1),
		description: 'Pay your taxes before this time!',
	});

	event1.save(function(err) {
		if(err) { console.log('Error'); }
		//Saved!
		console.log('Event saved');
	});
	
});

/*
let event1 = new Events({
	name: 'Pay Taxes',
	user: user1,
	priority: 1,
	eventDate: new Date(2018, 4, 1),
	description: 'Pay your taxes before this time!',
});

event1.save(function(err) {
	if(err) { console.log('Error'); }
	//Saved!
	console.log('Event saved');
});
*/