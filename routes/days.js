/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * '/days/... routes.
 */

var express = require('express');
var router = express.Router();
let passport = require('passport');

var daysController = require('../controllers/daysController.js');
let auth = require('./authent.js');

router.get('/:year/:month/:day', auth.authenticate, daysController.dayDisplay);

module.exports = router;