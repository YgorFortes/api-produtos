const { Sequelize, BaseError } = require("sequelize");


function manipuladorErros(erro, req, res, next){

  console.log(erro)
  const mensagemErro = erro.errors ? erro.errors[0].message : null;
  if(erro instanceof Sequelize.Error){
    res.status(400).send({mensagem: mensagemErro})
  } else if(erro instanceof Sequelize.ValidationError){
     res.status(400).send({mensagem: "Erro de validação"})
  } else if(erro instanceof Sequelize.BaseError){
    res.status(500).send({mensagem: "Erro interno do servidor"})
  }else{
    next(erro);
  }
  
}

module.exports = manipuladorErros;