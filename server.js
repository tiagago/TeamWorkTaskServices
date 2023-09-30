const express = require("express");
const bodyParser = require("body-parser")

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/X-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TeamWork Tasks application." });
});

const db = require("./src/models")

db.sequelize.sync();

require("./src/routers/usuario.routers")(app);
require("./src/routers/projeto.routers")(app);
require("./src/routers/projetoUsuario.routers")(app);
require("./src/routers/tag.routers")(app);

const port = process.env.PORT || 8080;

// Set port, listen for request
app.listen(port, function () {
  console.log(`app listening on port ${port}`);
});