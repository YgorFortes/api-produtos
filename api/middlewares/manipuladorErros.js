const { Sequelize } = require("sequelize");


function manipuladorErros(erro, req, res, next){
  console.log(erro)
  const mensagemErro = erro.errors ? erro.errors[0].message : null;
  console.log(mensagemErro)
  if(erro instanceof Sequelize.ValidationError){
    res.status(400).send({mensagem: "Erro de validação: ", mensagemErro});
  }else if (erro instanceof Sequelize.DatabaseError) {
    res.status(500).send({ mensagem: 'Erro de banco de dados'});
  }else if(erro instanceof Sequelize.TimeoutError){
    res.status(408).send({ mensagem: 'Erro de tempo limite do banco de dados'});
  }else if(erro.code && erro.errno){
    res.status(500).send({ mensagem: `Erro ${erro.code}: ${erro.message}` });
  }else if(erro instanceof Sequelize.BaseError){
    res.status(500).send({mensagem: "Erro interno do servidor"})
  }else if(mensagemErro === null){
    res.status(500).send({mensagem: "Erro interno do servidor"})
  }else{
    next(erro);
  }
}

// function manipuladorErros(erro, req, res, next) {
//   console.error(erro);

//   if (erro instanceof Sequelize.ValidationError) {
//     res.status(400).send({ mensagem: 'Erro de validação: ' + erro.message });
//   } else if (erro instanceof Sequelize.DatabaseError) {
//     res.status(500).send({ mensagem: 'Erro de banco de dados: ' + erro.message });
//   } else if (erro instanceof Sequelize.TimeoutError) {
//     res.status(408).send({ mensagem: 'Erro de tempo limite do banco de dados: ' + erro.message });
//   } else if (erro instanceof Sequelize.Error) {
//     res.status(400).send({ mensagem: erro.message });
//   } else if (erro.code && erro.errno) {
//     // Erros genéricos do Node.js
//     res.status(500).send({ mensagem: `Erro ${erro.code}: ${erro.message}` });
//   } else {
//     // Erro interno do servidor
//     res.status(500).send({ mensagem: 'Erro interno do servidor' });
//   }
// }

module.exports = manipuladorErros;