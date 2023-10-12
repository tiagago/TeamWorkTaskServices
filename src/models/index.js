const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://root:3qbOH3gp6kPtK9rx1Q1Hcb7NYvLKZxcg@dpg-ckatdkciibqc73fpl7j0-a.oregon-postgres.render.com/twtbanco?ssl=true", {
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true,
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
db.historico = require("./historico.model.js")(sequelize, Sequelize);
db.projetoUsuario = require("./projetoUsuario.model.js")(sequelize, Sequelize);
db.projetoUsuario.removeAttribute('id');

// Referencias One to Many
db.usuario.hasMany(db.projeto, {
  foreignKey: 'criador'
}, { as: "projetos" });
db.projeto.belongsTo(db.usuario, {
  foreignKey: "criador",
});

db.projeto.hasMany(db.tag, {
  foreignKey: 'projeto_id'
},  { as: "tags" });
db.tag.belongsTo(db.projeto, {
  foreignKey: "projeto_id",
}, { as: "projeto" });

db.projeto.hasMany(db.tarefa, {
  foreignKey: 'projeto_id'
}, { as: "tarefas" });
db.tarefa.belongsTo(db.projeto, {
  foreignKey: "projeto_id",
}, { as: "projeto" });

db.usuario.hasMany(db.tarefa, {
  foreignKey: 'usuario_id'
}, { as: "tarefas" });
db.tarefa.belongsTo(db.usuario, {
  foreignKey: "usuario_id",
}, { as: "usuario" });

db.tag.hasMany(db.tarefa, {
  foreignKey: 'tag_id'
}, { as: "tarefas" });
db.tarefa.belongsTo(db.tag, {
  foreignKey: "tag_id",
}, { as: "tag" });

db.projeto.hasMany(db.historico, {
  foreignKey: 'projeto_id'
},  { as: "historicos" });
db.historico.belongsTo(db.projeto, {
  foreignKey: "projeto_id",
}, { as: "projeto" });

db.usuario.hasMany(db.historico, {
  foreignKey: 'usuario_id'
}, { as: "historicos" });
db.historico.belongsTo(db.usuario, {
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