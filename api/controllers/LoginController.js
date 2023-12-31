const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {LoginServices, PessoasServices} = require('../services/index.js');
const loginServices = new LoginServices;
const {verificaCamposVazios, resgatarIdLogin} = require('../helpers/helpers.js');
require('dotenv').config();

class LoginController{

  static async criarLogin(req, res, next){
    const {email, senha, confirmarSenha} =  req.body;

    try {
      
      //Verificando os campos vazios
      const campos = ['email', 'senha', 'confirmarSenha'];
      const erroCampos = verificaCamposVazios(req.body, campos);
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Formatando a entrada de email em minusculo
      const emailFormatado = formatarEmailMinuscula(email);

      //Verificando se senhas correspondm
      if(senha !== confirmarSenha){
        return res.status(409).send({mensagem: 'Senhas não conferem'});
      }
      
      //Verifica se a senha confere com a regex
      if(!verificaCriterioSenha(senha)){
        return res.status(422).send({mensagem: 'A senha precisa ter pelo menos uma letra maiúsculas , minúsculas, um número e um carácter especial'});
      }

      //Verificando email já estar cadastrado
      const emailEncontrado = await loginServices.listarRegistroPorEmail(emailFormatado);
      if(emailEncontrado){
        return res.status(409).send({mensagem: 'Email já cadastrado. Por favor digite outro.'})
      }

      //Criptogrfando a senha
      const senhaHash = await criptografaSenha(senha);
      
      //Criando objeto login
      const login  = {
        email: emailFormatado,
        senha: senhaHash
      }

      //Criando login
      const novoLogin = await loginServices.criarRegistro(login);

      //Escondendo senha
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
      const campos = ['email', 'senha'];
      const erroCampos = verificaCamposVazios(req.body, campos);
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Formatando a entrada de email em minusculo
      const emailFormatado = formatarEmailMinuscula(email);

      //Busca no banco o email digitado
      const login = await loginServices.listarRegistroPorEmail(emailFormatado);
      
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
      const campos = ['email', 'senha'];
      const erroCampos = verificaCamposVazios(req.body, campos);      
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Formatando a entrada de email em minusculo
      const emailFormatado = formatarEmailMinuscula(email);

      //Verifica se a senha confere com a regex
      if(!verificaCriterioSenha(senha)){
        return res.status(422).send({mensagem: 'A senha precisa ter pelo menos uma letra maiúsculas , minúsculas, um número e um carácter especial'});
      }

      //resgatando idLogin
      const idLogin = await  resgatarIdLogin(req);
    

      //Buscando login e verificando se existe 
      const loginEncontrado = await loginServices.listarRegistroPorId(idLogin)
      if(!loginEncontrado){
        return res.stus(404).send({mensagem: 'Login não encontrado'});
      }

      const emailEncontrado = await loginServices.listarRegistroPorEmail(email);
      if(emailEncontrado){
        return res.status(409).send({mensagem: 'Email já cadastrado. Por favor digite outro.'})
      }


      //Criptografando senha
      const senhaHash = await criptografaSenha(senha);

      //Atualizando login
      const login = criarObjetoLogin(emailFormatado, senhaHash);

      const [resultado] = await loginServices.atualizarRegistro(idLogin, login);

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

//Criptogrfando a senha
async function criptografaSenha(senha){
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

function formatarEmailMinuscula(email){
  const emailFormatado= email.toLowerCase().trim();
  return emailFormatado;
}

function criarObjetoLogin(email, senha){
  return {
    email: email,
    senha: senha
  }
}



module.exports = LoginController;