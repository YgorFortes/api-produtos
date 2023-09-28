const database = require('../models/index.js');

class LoginController{

  static async criarLogin(req, res, next){
    const {email, senha} =  req.body;

    try {
      const novoLogin = await database.Login.create({email, senha});
      
      novoLogin.senha = undefined;
      res.status(201).send(novoLogin)
    } catch (erro) {
      console.log(erro)
      next(erro)
    }
  }
}

module.exports = LoginController;