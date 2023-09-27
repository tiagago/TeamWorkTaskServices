const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.projeto = require("./projeto.model.js")(sequelize, Sequelize);
db.tarefa = require("./tarefa.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.projetoUsuario = require("./projetoUsuario.model.js")(sequelize, Sequelize);

// Referencias One to Many
db.usuario.hasMany(db.projeto, {
  foreignKey: 'criador'
}, { as: "projetos" });
db.projeto.belongsTo(db.usuario, {
  foreignKey: "criador",
});


db.projeto.hasMany(db.tag, { as: "tags" });
db.tag.belongsTo(db.projeto, {
  foreignKey: "projeto_id",
}, { as: "projeto" });

db.projeto.hasMany(db.tarefa, { as: "tarefas" });
db.tarefa.belongsTo(db.projeto, {
  foreignKey: "projeto_id",
}, { as: "projeto" });

db.usuario.hasMany(db.tarefa, { as: "tarefas" });
db.tarefa.belongsTo(db.usuario, {
  foreignKey: "usuario_id",
}, { as: "usuario" });


// Referencias Many to Many

db.usuario.belongsToMany(db.projeto, {
  through: "tb_projeto_usuario",
  as: "participa",
  foreignKey: "usuario_id",
});

db.projeto.belongsToMany(db.usuario, {
  through: "tb_projeto_usuario",
  as: "associados",
  foreignKey: "projeto_id",
});


module.exports = db;