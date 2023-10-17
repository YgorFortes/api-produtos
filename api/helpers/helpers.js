require('dotenv').config();
const jwt = require('jsonwebtoken');

async function resgatarIdLogin(req){
  const secret = process.env.SECRET;
  const token = req.get('authorization').split(' ')[1];
  const idLogin = await jwt.verify(token, secret).id;
  return idLogin; 
}

function verificaCamposVazios(req, ...campos){
  for(let campo of campos){
    if(!req[campo]){
      const mensagem = `O campo ${campo} estar vazio, por favor digite`;
      return mensagem;
    }
  }
}

module.exports = {resgatarIdLogin, verificaCamposVazios}