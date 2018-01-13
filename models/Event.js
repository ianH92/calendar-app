/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Mongoose model for storing events and todos.
 */

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: {type: String, required: true, min: 3, max: 80},
	created: {type: Date, required: true, default: Date.now},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	priority: {type: Number, min: 1, max: 5, default: 5},
	eventDate: {type: Date, min: new Date(1999, 11, 31), max: new Date(2096, 11, 31)},
	description: {type: String, max: 250},
});

/* Return the url for an event.
 */
EventSchema.virtual('url').get(function() {
	return('/events/' + this._id);
});

/* Return the url for a todo.
 */
EventSchema.virtual('url_todo').get(function() {
	return('/todo/' + this._id);
});

/* Return the formatted date for an event/todo.
 */
EventSchema.virtual('date').get(function() {
	if(eventDate === null) { return ''; }
	
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 
				  'July', 'August', 'September', 'October', 'November', 'December'];
	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	return days[this.eventDate.getUTCDay()] + ' ' + months[this.eventDate.getUTCMonth()] +
			' ' + this.eventDate.getUTCDate() + ', '  + this.eventDate.getFullYear();
});

module.exports = mongoose.model('Event', EventSchema);