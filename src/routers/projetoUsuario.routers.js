module.exports = app => {
    const projetoUsuarios = require("../controllers/projetoUsuario.controller.js");
  
    var router = require("express").Router();
  
    // Delete a projetoUsuarios with id
    router.delete("/", projetoUsuarios.delete);

    router.post("/", projetoUsuarios.create);

    app.use('/api/projetoUsuario', router);
  };