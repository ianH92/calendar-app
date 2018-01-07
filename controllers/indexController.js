var Events = require('../models/Event.js');

exports.homePage = function(req, res) {
	let user = '5a444deae24862450047baab';
	
	Events.find({user: user, eventDate: null}, 'name priority')
	.sort({priority: +1, name: -1})
	.exec(function(error, todoList) {
		res.render('home', {title: 'Event Calendar', todos: todoList});
	});
}