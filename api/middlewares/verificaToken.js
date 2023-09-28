require('dotenv').config();
const jwt = require('jsonwebtoken');

function verificaToken(req, res, next){
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  console.log(token)
  if(!token) {
    return res.status(409).send({mensagem: 'Acesso negado'});
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (erro) {
    console.log(erro)
    return res.status(400).send({mensagem: 'Token inválido'});
  }
  
}

module.exports = verificaToken;