const database = require('../models/index.js');
require('dotenv').config();
async function verificaFuncionarioAtivo(req, res, next){
  try {
    const {email} = req.body;
    const pessoa = await database.Pessoas.scope('todas').findOne({
      include: [{
        model: database.Login,
        where: { email: email},
      }]
    })
  
    const ativo = pessoa ? pessoa.ativo : null;

    if(!pessoa){
      next();
    }else if(ativo !== true){
      return res.status(404).send({mensagem: 'Usuário não está mais ativo.'});
    }
   
  } catch (erro) {
    console.log(erro)
    return res.status(400).send({mensagem: 'Erro no servidor'});
  }
 
}

module.exports = verificaFuncionarioAtivo;