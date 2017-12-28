var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController.js');

router.get('/:eventId', eventController.eventDisplay);

module.exports = router;