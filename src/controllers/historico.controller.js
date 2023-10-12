const { query } = require("express");
const db = require("../models");
const Historico = db.historico;
const Op = db.Sequelize.Op;

// Find a single Tag with an id
exports.obterHistoricoPorProjeto = (req, res) => {
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

  Historico.findAll({ where: { projeto_id: req.query.idProjeto}, include: [db.usuario]})
    .then(data => {
      if (data) {
        res.send(
          {
            historicos: data,
            success: true,
            message: ""
          });
      } else {
        res.status(404).send(
          {
            historicos: null,
            success: false,
            message: `Não foi possivel concluir a requisição.`
          });
      }
    })
    .catch(err => {
      res.status(500).send(
        {
          historicos: null,
        success: false,
        message: `Não foi possivel concluir a requisição.`
      });
    });
};