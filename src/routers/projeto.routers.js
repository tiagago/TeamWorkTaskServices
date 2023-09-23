module.exports = app => {
    const projeto = require("../controllers/projeto.controller.js");
  
    var router = require("express").Router();

  // Create a new projeto
    router.post("/", projeto.create);

    router.get("/obterMeusProjetos/:criador", projeto.findByCriador);
  
    app.use('/api/projeto', router);
  };