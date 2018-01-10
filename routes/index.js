var express = require('express');
var router = express.Router();
let passport = require('passport');

var indexController = require('../controllers/indexController');
var calendarController = require('../controllers/calendarController');
var authController = require('../controllers/authController');
let auth = require('./authent.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/login');
});

router.get('/home', auth.authenticate, indexController.homePage);

router.get('/about', auth.authenticate, function(req, res, next) {
	res.render('about', {title: 'Event Calendar'});
});

router.get('/login', function(req, res, next) {
	res.render('login', { msg: req.flash('msg') });;
});

router.post('/login', passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login'}));

router.get('/logout', function(req, res, next) {
		req.logout();
		req.flash('msg', 'Logout successful');
		res.redirect('/login');
});

router.get('/signup', function(req, res, next) {
	res.render('signup');
});

	
router.post('/signup', authController.signup);
	
router.get('/getcalendar/:year/:month/:day', auth.authenticate, calendarController.createCalendarJSON);

module.exports = router;