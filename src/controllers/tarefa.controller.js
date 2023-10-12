const { query } = require("express");
const db = require("../models");
const Tarefa = db.tarefa;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.tarefa ||
    !req.body.tarefa.projeto) {
    res.status(400).send({
      tag: null,
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  var usuarioId = null
  var tagId = null
  if(req.body.tarefa.usuario){
    usuarioId = req.body.tarefa.usuario.id
  }

  if(req.body.tarefa.tag){
    tagId = req.body.tarefa.tag.id
  }

  // Save Tag in the database
  Tarefa.create({
    nome: req.body.tarefa.nome,
    descricao: req.body.tarefa.descricao,
    prioridade: req.body.tarefa.prioridade,
    status: req.body.tarefa.status,
    dataEntrega: req.body.tarefa.dataEntrega,
    dataCriacao: new Date(),
    projeto_id: req.body.tarefa.projeto.id,
    usuario_id: usuarioId,
    tag_id: tagId
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
  if (!req.body.tarefa) {
    res.status(400).send({
     success: false,
     message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  var usuarioId = null
  var tagId = null
  if(req.body.tarefa.usuario){
    usuarioId = req.body.tarefa.usuario.id
  }

  if(req.body.tarefa.tag){
    tagId = req.body.tarefa.tag.id
  }
  
  Tarefa.update({
    nome: req.body.tarefa.nome,
    descricao: req.body.tarefa.descricao,
    prioridade: req.body.tarefa.prioridade,
    status: req.body.tarefa.status,
    dataEntrega: req.body.tarefa.dataEntrega,
    usuario_id: usuarioId,
    tag_id: tagId
    } , {
      where: { id: req.body.tarefa.id }
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

exports.delete = (req, res) => {
  // Validate request
  if (!req.query.id) {
    res.status(400).send({
      success: false,
      message: "Conteudo da requisição não pode ser vazio!"
    });
    return;
  }

  Tarefa.destroy({
    where: { id: req.query.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Tarefa excluida com sucesso!"
        });
      } else {
        res.send({
          success: false,
          message: "Não foi possivel excluir Tarefa!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "Não foi possivel excluir Tarefa!"
      });
    });
};


// Find a single Tag with an id
exports.obterTarefasPorProjetoStatus = (req, res) => {
  // Validate request
  if (!req.query.idProjeto ||
      !req.query.idStatus) {
    res.status(400).send(
      {
        tarefas: null,
        success: false,
        message: "Conteudo da requisição Tarefa não pode ser vazio!"
      });
    return;
  }

  Tarefa.findAll({ where: { projeto_id: req.query.idProjeto, status: req.query.idStatus}, include: [db.usuario, db.tag]})
    .then(data => {
      if (data) {
        res.send(
          {
            tarefas: data,
            success: true,
            message: ""
          });
      } else {
        res.status(404).send(
          {
            tarefas: null,
            success: false,
            message: `Não foi possivel concluir a requisição.`
          });
      }
    })
    .catch(err => {
      res.status(500).send(
        {
          tarefas: null,
        success: false,
        message: `Não foi possivel concluir a requisição.`
      });
    });
};