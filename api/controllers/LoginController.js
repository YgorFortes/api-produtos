const database = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginController{

  static async criarLogin(req, res, next){
    const {email, senha, confirmarSenha} =  req.body;

    try {
      //Verificando se senhas correspondm
      if(senha !== confirmarSenha){
        return res.status(409).send({mensagem: 'Senhas não conferem'});
      }

      //Verificando email já estar cadastrado
      const emailEncontrado = await database.Login.findOne({where: {email: email}});
      if(emailEncontrado){
        return res.status(409).send({mensagem: 'Email já cadastrado'});
      }

      //Criptogrfando a senha
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senha, salt);
      const novoLogin = await database.Login.create({email: email, senha: senhaHash});

      novoLogin.senha = undefined;
      return res.status(201).send(novoLogin)
    } catch (erro) {
      console.log(erro)
      next(erro);
    }
  }

  static async login(req, res, next){
    const {email, senha} = req.body;
    try {
      const login = await database.Login.findOne({where: {email: email}});

      if(!login){
        return res.status(409).send({mensagem: 'Email não cadastrado'});
      }

      const verificaSenha = await bcrypt.compare(senha, login.senha);

      if(!verificaSenha){
        return res.status(422).send({mensagem: 'Senha inválida'});
      }

      const secret = process.env.SECRET;
      const token =  jwt.sign(
        {
         id:login.id,
        }
      ,secret);

      return res.status(200).send({mensagem: 'Login efetuado com sucesso', token})
        
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = LoginController;