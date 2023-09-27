module.exports = app => {
    const projetoUsuarios = require("../controllers/projetoUsuario.controller.js");
  
    var router = require("express").Router();
  
    // Delete a Tutorial with id
    router.delete("/", projetoUsuarios.delete);

    app.use('/api/projetoUsuario', router);
  };