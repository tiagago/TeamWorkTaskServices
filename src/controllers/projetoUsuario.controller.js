const { query } = require("express");
const db = require("../models");
const ProjetoUsuario = db.projetoUsuario;
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

  // Create and Save a new Usuario
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