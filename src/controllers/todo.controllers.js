const { TodoModel } = require("../models/todo.model");
const {
  create200Response,
  create500Response,
  create201Response,
  create400Response,
} = require("../utils/responseFuns");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user._id });
    return create200Response(res, todos);
  } catch (error) {
    return create500Response(res, error);
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority, flags } = req.body;
  const { user } = req;
  try {
    const todo = new TodoModel({
      title,
      description,
      user: user._id,
      dueDate,
      priority,
      flags,
    });
    const savedTodo = await todo.save();
    return create201Response(res, savedTodo);
  } catch (error) {
    return create500Response(res, error);
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description, dueDate, priority, flags } = req.body;
  try {
    let todo = await TodoModel.findOne({ _id: id });
    console.log(todo);
    if (!todo) {
      return create400Response(res, "Invalid todo id");
    }
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    todo.flags = flags;
    const savedTodo = await todo.save();
    return create200Response(res, savedTodo);
  } catch (error) {
    return create500Response(res, error);
  }
};

exports.completeTodo = async (req, res) => {
  const id = req.params.id;
  try {
    let todo = await TodoModel.findOne({ _id: id });
    if (!todo) {
      return create400Response(res, "Invalid todo id");
    }
    todo.isCompleted = !todo.isCompleted;
    const savedTodo = await todo.save();
    return create200Response(res, savedTodo);
  } catch (error) {
    return create500Response(res, error);
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await TodoModel.deleteOne({ _id: id });
    return create200Response(res, todo);
  } catch (error) {
    return create500Response(res, error);
  }
};
