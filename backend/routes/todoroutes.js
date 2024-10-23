const express = require('express');
const router = express.Router();
const todoController = require('../controller/todocontroller');

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.put('/:id', todoController.updateTodo);

module.exports = router;