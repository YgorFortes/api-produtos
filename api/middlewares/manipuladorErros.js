const { Sequelize, BaseError } = require("sequelize");


function manipuladorErros(erro, req, res, next){

  if(erro instanceof Sequelize.Error){
    res.status(400).send({mensagem: "Um ou mais valores digitatados, são inválidos"})
  } else if(erro instanceof Sequelize.ValidationError){
     res.status(400).send({mensagem: "Erro de validação"})
  } else if(erro instanceof Sequelize.BaseError){
    res.status(500).send({mensagem: "Erro interno do servidor"})
  }
  next();

}

module.exports = manipuladorErros;