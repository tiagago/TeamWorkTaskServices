module.exports = app => {
    const historico = require("../controllers/historico.controller.js");
  
    var router = require("express").Router();

    // get all historico by projeto
    router.get("/obterHistoricoPorProjeto/", historico.obterHistoricoPorProjeto);

    app.use('/api/historico', router);
  };