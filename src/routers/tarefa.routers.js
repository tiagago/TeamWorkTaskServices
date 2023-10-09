module.exports = app => {
    const tarefa = require("../controllers/tarefa.controller.js");
  
    var router = require("express").Router();
  
   // Create a new Tarefa
    router.post("/", tarefa.create);

    // Update a Tarefa
    router.put("/", tarefa.update);

    router.delete("/", tarefa.delete);

    // get all Tarefa by projeto and status
    router.get("/obterTarefasPorProjetoStatus/", tarefa.obterTarefasPorProjetoStatus);

    app.use('/api/tarefa', router);
  };