const { query } = require("express");
const db = require("../models");
const ProjetoUsuario = db.projetoUsuario;
const historicoController = require("../controllers/historico.controller.js");
const Op = db.Sequelize.Op;

// Delete a ProjetoUsuario with the specified id in the request
exports.delete = (req, res) => {
    // Validate request
    if (!req.query.idProjeto || !req.query.idUsuario) {
      res.status(400).send({
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
      return;
    }

    ProjetoUsuario.destroy({
      where: { projeto_id: req.query.idProjeto, usuario_id: req.query.idUsuario }
    })
      .then(num => {
        if (num == 1) {
          historicoController.asyncCall("Foi Removido do Projeto " , req.query.idUsuario, req.query.idProjeto)
          res.send({
            success: true,
            message: "Usuário desvinculado do projeto com sucesso!"
          });
        } else {
          res.send({
            success: false,
            message: "Não foi possivel desvincular o usuário do projeto!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: "Não foi possivel desvincular o usuário do projeto!"
        });
      });
  };

  // Include an usuario in project
exports.create = (req, res) => {
  // Validate request
  if (!req.body.projeto && 
      !req.body.usuario) {
    res.status(400).send({
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  // Save Usuario in the database
  ProjetoUsuario.create({ projeto_id: req.body.projeto.id, usuario_id: req.body.usuario.id})
    .then(data => {

      historicoController.asyncCall("Entrou no Projeto " , req.body.usuario.id, req.body.projeto.id)
      res.send({
        success: true,
        message: ""
      })
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocorreu um erro ao tentar criar um projeto."
      });
    });
};