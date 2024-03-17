import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (req, res) => {
  const todoData = req.body;
  todoData.user = req.user._id;
  const todo = new Todo(todoData);
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
export const toggleTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    const todo = await Todo.findById(_id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(_id);
    res.status(201).json(deletedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
