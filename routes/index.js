var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var calendarController = require('../controllers/calendarController');

/* GET home page. */
router.get('/', calendarController.createCalendarJSON);

router.get('/home', calendarController.createCalendarJSON);

router.get('/about', function(req, res, next) {
	res.send('This is the about page');
});

module.exports = router;
