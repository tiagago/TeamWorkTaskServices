module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
    // Retrieve a single Tutorial with id
    router.get("/", usuario.doLogin);
  
    app.use('/api/login', router);
  };