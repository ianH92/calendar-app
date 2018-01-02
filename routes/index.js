var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var calendarController = require('../controllers/calendarController');

/* GET home page. */
router.get('/', indexController.homePage);

router.get('/home', indexController.homePage);

router.get('/about', function(req, res, next) {
	res.send('This is the about page');
});

router.get('/:year/:month', calendarController.createCalendarJSON);

module.exports = router;
