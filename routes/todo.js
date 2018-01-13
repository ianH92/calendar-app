/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * '/todo/... routes.
 */

var express = require('express');
var router = express.Router();
let passport = require('passport');

var todoController = require('../controllers/todoController.js');
let auth = require('./authent.js');

router.get('/createTodo', auth.authenticate, todoController.createTodo);

router.post('/createTodo', auth.authenticate, todoController.createTodoPost);

router.get('/:todoID', auth.authenticate, todoController.displayTodo);

module.exports = router;