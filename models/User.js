var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {type: String, required: true, min: 3, max: 100},
	joined: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);