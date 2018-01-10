var express = require('express');
var router = express.Router();
let passport = require('passport');

var eventController = require('../controllers/eventController.js');
let auth = require('./authent.js');

router.get('/createEvent', auth.authenticate, eventController.createEvent);

router.post('/createEvent', auth.authenticate, eventController.createEventPost);

router.get('/:eventId', auth.authenticate, eventController.eventDisplay);

module.exports = router;