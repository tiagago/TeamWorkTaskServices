module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
  
    var router = require("express").Router();
  
   // Create a new Tag
    router.post("/", tags.create);

    // Update a Tag
    router.put("/", tags.update);

    // get all Tags by projeto_id
    router.get("/obterTagsPorProjeto/", tags.obterTagsPorProjeto);

    app.use('/api/tag', router);
  };