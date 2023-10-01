module.exports = app => {
    const projeto = require("../controllers/projeto.controller.js");
  
    var router = require("express").Router();

  // Create a new projeto
    router.post("/", projeto.create);

    router.put("/", projeto.update);

    router.get("/obterMeusProjetos/", projeto.findByCriador);

    router.get("/obterProjetoComParticipantes/", projeto.findOneWithParticipantes);

    router.get("/obterProjetoPorCodigo/", projeto.findByCodigo);
  
    app.use('/api/projeto', router);
  };