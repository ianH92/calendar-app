var express = require('express');
var router = express.Router();
let passport = require('passport');

var indexController = require('../controllers/indexController');
var calendarController = require('../controllers/calendarController');
var authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/login');
});

router.get('/home', indexController.homePage);

router.get('/about', function(req, res, next) {
	res.render('about', {title: 'Event Calendar'});
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.post('/login', passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login'}));


router.get('/signup', function(req, res, next) {
	res.render('signup');
});

	
router.post('/signup', authController.signup);
	
router.get('/getcalendar/:year/:month/:day', calendarController.createCalendarJSON);

module.exports = router;