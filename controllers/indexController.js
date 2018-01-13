/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 */

var Events = require('../models/Event.js');

exports.homePage = function(req, res) {
	let user = req.user.id;
	
	Events.find({user: user, eventDate: null}, 'name priority')
	.sort({priority: +1, name: -1})
	.exec(function(error, todoList) {
		res.render('home', {todos: todoList});
	});
}