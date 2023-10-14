const { query } = require("express");
const db = require("../models");
const Historico = db.historico;
const Op = db.Sequelize.Op;

// Get historias by projeto
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

  Historico.findAll({ where: { projeto_id: req.query.idProjeto}, order:[['dataCriacao', 'DESC']], include: [db.usuario]})
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

exports.asyncCall = async function asyncCall(descricao, idUsuario, idProjeto) {
  Historico.create({
    descricao: descricao,
    dataCriacao: new Date(),
    projeto_id: idProjeto,
    usuario_id: idUsuario
  }).then(data => { }).catch(err => {});
}