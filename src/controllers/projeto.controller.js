const db = require("../models");
const Projeto = db.projeto;
const historicoController = require("../controllers/historico.controller.js");
const Op = db.Sequelize.Op;

// Create and Save a new Projeto
exports.create = (req, res) => {
    // Validate request
    if (!req.body.projeto && 
        !req.body.usuario) {
      res.status(400).send({
        projeto: null,
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
      return;
    }
  
    // Create a Projeto
    const projeto = {
      codigo: req.body.projeto.codigo,
      descricao: req.body.projeto.descricao,
      dataCriacao: new Date(),
      nome: req.body.projeto.nome,
      criador: req.body.usuario.id,
    };
  
    // Save Projeto in the database
    Projeto.create(projeto)
      .then(data => {

        historicoController.asyncCall("Criou o Projeto", req.body.usuario.id, data.id)
        
        res.send({
          projeto: data,
          success: true,
          message: ""
        })
      })
      .catch(err => {
        res.status(500).send({
          projeto: null,
          success: false,
          message:
            err.message || "Ocorreu um erro ao tentar criar um projeto."
        });
      });
  };

// Find a single Projeto with an id
exports.findByCriador = (req, res) => {
    const criador = req.query.idUsuario;

    // Validate request
    if (criador == null) {
      res.status(400).send(
        {
          projetos: null,
          success: false,
          message: "Conteudo da requisição não pode ser vazio!"
        });
      return;
    }

    Projeto.findAll({ where: { criador: criador} , include: db.usuario })
      .then(data => {
        if (data) {
          res.send(
            {
              projetos: data,
              success: true,
              message: ""
            });
        } else {
          res.status(404).send(
            {
              projetos: null,
              success: false,
              message: `Não foi possivel concluir a requisição.`
            });
        }
      })
      .catch(err => {
        res.status(500).send(
          {
          projetos: null,
          success: false,
          message: `Não foi possivel concluir a requisição.`
        });
      });
  };

// Find a single Projeto with an id
exports.findOneWithParticipantes = (req, res) => {
  const id = req.query.idProjeto;
  
  Projeto.findByPk(id, {include: [db.usuario, { model: db.usuario,  as: "associados"}]})
    .then(data => {
      if (data) {
        res.send({
          projeto: data,
          success: true,
          message: ""
        });
      } else {
        res.status(404).send({
          projeto: null,
          success: false,
          message: `Não foi possivel encontrar Projeto com o id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        projeto: null,
        success: false,
        message: "Não foi possivel encontrar Projeto com o id=" + id
      });
    });
  };

// Find a single Project by the codigo
exports.findByCodigo = (req, res) => {
  const codigo = req.query.codigo;

  // Validate request
  if (codigo == null) {
    res.status(400).send(
      {
        projetos: null,
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
    return;
  }

  Projeto.findAll({ where: { codigo: codigo}})
    .then(data => {
      if (data) {
        res.send(
          {
            projetos: data,
            success: true,
            message: ""
          });
      } else {
        res.status(404).send(
          {
            projetos: null,
            success: false,
            message: `Não foi possivel concluir a requisição.`
          });
      }
    })
    .catch(err => {
      res.status(500).send(
        {
        projetos: null,
        success: false,
        message: `Não foi possivel concluir a requisição.`
      });
    });
};

// Update a Projeto by the id in the request
exports.update = (req, res) => {

  if (!req.body.projeto && 
      !req.body.usuario) {
    res.status(400).send({
      projeto: null,
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  Projeto.update({ nome: req.body.projeto.nome , descricao: req.body.projeto.descricao }, {
    where: { id: req.body.projeto.id }
  })
    .then(num => {
      if (num == 1) {
        historicoController.asyncCall("Alterou o Projeto", req.body.usuario.id, req.body.projeto.id)

        res.send({
          success: true,
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Error updating Tutorial with id=" + id
      });
    });
  };
