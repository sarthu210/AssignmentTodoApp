const { Todo } = require('../models');

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Todo.update(req.body, { where: { id } });
    if (updated) {
      const updatedTodo = await Todo.findOne({ where: { id } });
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};