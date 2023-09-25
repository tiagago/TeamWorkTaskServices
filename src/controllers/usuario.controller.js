const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Create and Save a new Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        usuario: null,
        success: false,
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Usuario
    const usuario = {
      email: req.body.email,
      nomeExibicao: req.body.nomeExibicao,
      senha: req.body.senha
    };
  
    // Save Usuario in the database
    Usuario.create(usuario)
      .then(data => {
        res.send({
          usuario: data,
          success: true,
          message: ""
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao tentar criar um usuario."
        });
      });
  };

// Find a single Tutorial with an id
exports.doLogin = (req, res) => {
    const email = req.query.email
    const senha = req.query.senha

    // Validate request
    if (email == null || senha == null) {
      res.status(400).send(
        {
          usuario: null,
          success: false,
          message: "Conteudo da requisição não pode ser vazio!"
        });
      return;
    }

    Usuario.findOne({ where: { email: email , senha: senha }})
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
              message: `Usuário ${email} não cadastrado ou senha inválida.`
            });
        }
      })
      .catch(err => {
        res.status(500).send(
          {
          usuario: null,
          success: false,
          message: `Usuário ${email} não cadastrado ou senha inválida.`
        });
      });
  };

  // Find a single Usuario with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

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

// Update a Usuario by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Usuario.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };