const { query } = require("express");
const db = require("../models");
const ProjetoUsuario = db.projetoUsuario;
const Op = db.Sequelize.Op;

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const idProjeto = req.query.idProjeto;
    const idUsuario = req.query.idUsuario;

    // Validate request
    if (!idProjeto || !idUsuario) {
      res.status(400).send({
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
      return;
    }

    ProjetoUsuario.destroy({
      where: { projeto_id: idProjeto, usuario_id: idUsuario }
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
