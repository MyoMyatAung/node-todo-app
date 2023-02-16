const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controllers");
const { createTodoReqValidator } = require("../middlewares/todo.validator");
const authVerify = require("../middlewares/token_verify.middlewares");

router.get("/", authVerify, todoController.getAllTodos);

router.post("/", authVerify, createTodoReqValidator, todoController.createTodo);

router.put(
  "/:id",
  authVerify,
  createTodoReqValidator,
  todoController.updateTodo
);

router.patch("/:id", authVerify, todoController.completeTodo);

router.delete("/:id", authVerify, todoController.deleteTodo);

module.exports = router;
