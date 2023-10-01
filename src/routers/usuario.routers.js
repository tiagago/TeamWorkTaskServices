module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/", usuario.create);
    
    // Retrieve a single Tutorial with id
    router.get("/doLogin/", usuario.doLogin);

    // Retrieve a single Usuario with id
    router.get("/obterPorID/", usuario.findOne);
  
    app.use('/api/usuario', router);
  };