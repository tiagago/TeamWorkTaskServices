const { query } = require("express");
const db = require("../models");
const Tag = db.tag;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.tag ||
    !req.body.tag.projeto) {
    res.status(400).send({
      tag: null,
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  // Save Tag in the database
  Tag.create({
    cor: req.body.tag.cor,
    nome: req.body.tag.nome,
    projeto_id: req.body.tag.projeto.id
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
  if (!req.body.tag) {
    res.status(400).send({
     success: false,
     message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  Tag.update({ cor: req.body.tag.cor, nome: req.body.tag.nome } , {
      where: { id: req.body.tag.id }
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

// Find a single Tag with an id
exports.obterTagsPorProjeto = (req, res) => {
  // Validate request
  if (!req.query.idProjeto) {
    res.status(400).send(
      {
        tags: null,
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
    return;
  }

  Tag.findAll({ where: { projeto_id: req.query.idProjeto}})
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