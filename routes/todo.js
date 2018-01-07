var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController.js');

router.get('/createTodo', todoController.createTodo);

router.post('/createTodo', todoController.createTodoPost);

router.get('/:todoID', todoController.displayTodo);

module.exports = router;