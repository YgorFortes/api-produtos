const database = require('../models/index.js');
const {resgatarIdLogin} = require('../helpers/helpers.js')
require('dotenv').config();
async function verificaFuncao(req, res, next){
  try {
    const idLogin = await await resgatarIdLogin(req);

    const pessoa = await database.Pessoas.findOne({where:{ login_id:  idLogin}});
    
    const papel = pessoa.funcao.toLowerCase();

    if((papel!== 'gerente')){
      return res.status(409).send({mensagem:'Acesso negado'});
    }
    next();
  } catch (erro) {
    console.log(erro)
    return res.status(400).send({mensagem: 'Erro no servidor'});
  }
 
}

module.exports = verificaFuncao