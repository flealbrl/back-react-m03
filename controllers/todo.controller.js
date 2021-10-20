const mongoose = require("mongoose");

const TodoServices = require("./../services/todo.service");

const todoService = new TodoServices();

class TodoController {
  getTodo = async (req, res) => {
    const todo = await todoService.findAll();
    res.send(todo);
  };

  getTodoById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send("Id  Inválido");
      return;
    }

    const todo = await todoService.findById(id);

    if (!todo) {
      res.status(404).send("Tarefa não Encontrada");
      return;
    }

    res.status(200).send(todo);
  };

  createTodo = async (req, res) => {
    const todo = req.body;
    const todoSalva = await todoService.createTodo(todo)
      .then(() => {
        res.send({ message: `Tarefa Criada` });
      })
      .catch((err) =>
        res.status(500).send({ error: `erro no servdor: ${err}` }));
  };

  editTodo = async (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    await todoService.editTodo(id,todo)
      .then(() => {
        res.status(200).send({ message: "Tarefa Atualizada" });
      })
      .catch((err) =>
        res.status(500).send({ error: `erro no servdor: ${err}` })
      );
  };

  deleteTodo = async (req, res) => {
    const id = req.params.id;
    await todoService.deleteTodo(id)
    .then(() => res.status(200).send({ message: "Tarefa Excluida" }));
  };
}

module.exports = TodoController;
