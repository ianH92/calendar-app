var express = require('express');
var router = express.Router();
var daysController = require('../controllers/daysController.js');


router.get('/:year/:month/:day', daysController.dayDisplay);

module.exports = router;