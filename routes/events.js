/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * '/events/... routes.
 */

var express = require('express');
var router = express.Router();
let passport = require('passport');

var eventController = require('../controllers/eventController.js');
let auth = require('./authent.js');

router.get('/createEvent', auth.authenticate, eventController.createEvent);

router.post('/createEvent', auth.authenticate, eventController.createEventPost);


router.get('/:eventId', auth.authenticate, eventController.eventDisplay);

router.post('/:eventId', auth.authenticate, eventController.deleteEvent);

module.exports = router;