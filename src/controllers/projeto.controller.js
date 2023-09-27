const db = require("../models");
const Projeto = db.projeto;
const Op = db.Sequelize.Op;

// Create and Save a new Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codigo && 
        !req.body.descricao &&
        !req.body.nome && 
        !req.body.usuario) {
      res.status(400).send({
        projeto: null,
        success: false,
        message: "Conteudo da requisição não pode ser vazio!"
      });
      return;
    }
  
    // Create a Usuario
    const projeto = {
      codigo: req.body.codigo,
      descricao: req.body.descricao,
      dataCriacao: new Date(),
      nome: req.body.nome,
      criador: req.body.usuario.id,
    };
  
    // Save Usuario in the database
    Projeto.create(projeto)
      .then(data => {
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

// Find a single Tutorial with an id
exports.findByCriador = (req, res) => {
    const criador = req.params.criador;

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

// Find a single Usuario with an id
exports.findOneWithParticipantes = (req, res) => {
  const id = req.params.idProjeto;
  
  Projeto.findByPk(id, {include: [{ model: db.usuario,  as: "associados"}]})
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

  // Find a single Usuario with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Projeto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possivel encontrar Projeto com o id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel encontrar Projeto com o id=" + id
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
