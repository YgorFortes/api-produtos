const database = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {LoginServices} = require('../services/index.js');
const loginServices = new LoginServices;
const {verificaCamposVazios, resgatarIdLogin} = require('../helpers/helpers.js');
require('dotenv').config();

class LoginController{

  static async criarLogin(req, res, next){
    const {email, senha, confirmarSenha} =  req.body;

    try {
      
      //Verificando os campos vazios
      const erroCampos = verificaCamposVazios(req.body, 'email', 'senha', 'confirmarSenha');
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Verificando se senhas correspondm
      if(senha !== confirmarSenha){
        return res.status(409).send({mensagem: 'Senhas não conferem'});
      }
      
      //Verifica se a senha confere com a regex
      if(!verificaCriterioSenha(senha)){
        return res.status(422).send({mensagem: 'A senha precisa ter pelo menos uma letra maiúsculas , minúsculas, um número e um carácter especial'});
      }

      //Verificando email já estar cadastrado
      const emailEncontrado = await database.Login.findOne({where: {email: email}});
      if(emailEncontrado){
        return res.status(409).send({mensagem: 'Email já cadastrado'});
      }

      //Criptogrfando a senha
      const senhaHash = await criptografaSenha(senha);
      const novoLogin = await loginServices.criarRegistro({email: email, senha: senhaHash});


     const novoLoginSemSenha = esconderSenha (novoLogin)
      
      return res.status(201).send(novoLoginSemSenha)

    } catch (erro) {
      console.log(erro)
      next(erro);
    }
  }

  static async login(req, res, next){
    const {email, senha} = req.body;
    try {

      //Verificando os campos vazios
      const erroCampos = verificaCamposVazios(req.body, 'email', 'senha');
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Busca no banco o email digitado
      const login = await loginServices.listarRegistroPorEmail(email);

      //Verifica se existe usuario pelo email digitado 
      if(!login){
        return res.status(409).send({mensagem: 'Email não cadastrado'});
      }

      //Confere se a senhas conferem 
      const verificaSenha = await bcrypt.compare(senha, login.senha);
      if(!verificaSenha){
        return res.status(422).send({mensagem: 'Senha inválida'});
      }

      //Cria um token com o id de usuário
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

  static async atualizarLogin(req, res, next){
    const {email, senha} =  req.body;
    try {

      //Verificando campos 
      const erroCampos = verificaCamposVazios(req.body, 'email', 'senha');      
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Verifica se a senha confere com a regex
      if(!verificaCriterioSenha(senha)){
        return res.status(422).send({mensagem: 'A senha precisa ter pelo menos uma letra maiúsculas , minúsculas, um número e um carácter especial'});
      }

      //resgatando idLogin
      const idLogin = await  resgatarIdLogin(req);

      //Buscando login e verificando se existe 
      const login = await loginServices.listarRegistroPorId(idLogin)
      if(!login){
        return res.stus(404).send({mensagem: 'Login não encontrado'});
      }

      //Criptografando senha
      const senhaHash = await criptografaSenha(senha);

      //Atualizando login
      const [resultado] = await loginServices.atualizarRegistro(idLogin, {email, senha: senhaHash});

      //Verifica se pessoa foi cadastrada com sucesso
      if(!resultado){
        return res.status(409).json({mensagem: 'login não atualizado'});
      }

      return res.status(200).send({mensagem: 'Login atualizado'});
    } catch (erro) {
      console.log(erro)
       next(erro);
    }
  }
}


async function criptografaSenha(senha){
  //Criptogrfando a senha
  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);
  return senhaHash
}


function esconderSenha (tabela){
  const tabelaSemSenha = {
    id: tabela.id,
    email: tabela.email
  }

  return tabelaSemSenha
}

function verificaCriterioSenha(senha){
  const regex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@#$%&*_-]/
  return regex.test(senha);
}



module.exports = LoginController;