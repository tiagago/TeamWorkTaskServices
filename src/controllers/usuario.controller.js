const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Create and Save a new Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.usuario.nomeExibicao ||
      !req.body.usuario.login ||
      !req.body.usuario.senha) {
      res.status(400).send({
        usuario: null,
        success: false,
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Save Usuario in the database
    Usuario.create({nomeExibicao: req.body.usuario.nomeExibicao,
       login: req.body.usuario.login, 
       senha: req.body.usuario.senha})
      .then(data => {
        res.send({
          usuario: data,
          success: true,
          message: ""
        });
      })
      .catch(err => {
        res.status(500).send({
          usuario: null,
          success: false,
          message:
            err.message || "Ocorreu um erro ao tentar criar um usuario."
        });
      });
  };

// Find a single Tutorial with an id
exports.doLogin = (req, res) => {
    const login = req.query.login
    const senha = req.query.senha

    // Validate request
    if (login == null || senha == null) {
      res.status(400).send(
        {
          usuario: null,
          success: false,
          message: "Conteudo da requisição não pode ser vazio!"
        });
      return;
    }

    Usuario.findOne({ where: { login: login , senha: senha }})
      .then(data => {
        if (data) {
          res.send(
            {
              usuario: data,
              success: true,
              message: ""
            });
        } else {
          res.status(404).send(
            {
              usuario: null,
              success: false,
              message: `Usuário ${login} não cadastrado ou senha inválida.`
            });
        }
      })
      .catch(err => {
        res.status(500).send(
          {
          usuario: null,
          success: false,
          message: `Usuário ${login} não cadastrado ou senha inválida.`
        });
      });
  };

  // Find a single Usuario with an id
exports.findOne = (req, res) => {
  const id = req.query.idUsuario;

  Usuario.findByPk(id, {include: [{ model: db.projeto,  as: "participa"}]})
    .then(data => {
      if (data) {
        res.send(
          {
            usuario: data,
            success: true,
            message: ""
          });
      } else {
        res.status(404).send({
          message: `Não foi possivel encontrar Usuário com o id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel encontrar Usuário com o id=" + id
      });
    });
};