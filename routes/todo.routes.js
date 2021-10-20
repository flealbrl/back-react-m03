const express = require("express");
const TodoController = require("./../controllers/todo.controller");
const router = express.Router();
const todoController = new TodoController();

// [GET]
router.get("/", todoController.getTodo);
// [GET]
router.get("/:id", todoController.getTodoById);
// [POST]
router.post("/", todoController.createTodo);
// [PUT]
router.put("/:id", todoController.editTodo);
// [DELETE]
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
