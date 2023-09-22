module.exports = app => {
    const projeto = require("../controllers/projeto.controller.js");
  
    var router = require("express").Router();

    router.get("/obterMeusProjetos/:criador", projeto.findByCriador);
  
    app.use('/api/projeto', router);
  };