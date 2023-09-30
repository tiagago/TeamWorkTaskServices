const { query } = require("express");
const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.cor && 
      !req.body.nome &&
      !req.body.projeto) {
    res.status(400).send({
      tag: null,
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  // Save Tag in the database
  Tag.create({
    cor: req.body.cor,
    nome: req.body.nome,
    projeto_id: req.body.projeto.id
  }).then(data => {
      res.send({
        tag: data,
        success: true,
        message: ""
      })
    })
    .catch(err => {
      res.status(500).send({
        tag: null,
        success: false,
        message:
          err.message || "Ocorreu um erro ao tentar criar uma Tag."
      });
    });
};

// Update a Usuario by the id in the request
exports.update = (req, res) => {
  if (!req.body.cor && 
      !req.body.nome &&
      !req.body.id) {
    res.status(400).send({
     success: false,
     message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  Tag.update({ cor: req.body.cor, nome: req.body.nome } , {
      where: { id: req.body.id }
    }).then(num => {
      if (num == 1) {
        res.send({
          success: true,
          message: ""
        })
      } else {
        res.send({
          success: false,
          message:
            err.message || "Ocorreu um erro ao tentar criar uma Tag."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocorreu um erro ao tentar criar uma Tag."
      });
    });
};

// Find a single Tutorial with an id
exports.obterTagsPorProjeto = (req, res) => {
  const criador = req.query.projetoId;

  // Validate request
  if (!req.query.projetoId) {
    res.status(400).send(
      {
        tags: null,
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
    return;
  }

  Tag.findAll({ where: { projeto_id: req.query.projetoId}})
    .then(data => {
      if (data) {
        res.send(
          {
            tags: data,
            success: true,
            message: ""
          });
      } else {
        res.status(404).send(
          {
            tags: null,
            success: false,
            message: `Não foi possivel concluir a requisição.`
          });
      }
    })
    .catch(err => {
      res.status(500).send(
        {
        tags: null,
        success: false,
        message: `Não foi possivel concluir a requisição.`
      });
    });
};