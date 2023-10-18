const database = require('../models/index.js');
const Services = require('./services.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')

class LoginServices extends Services{
  constructor(){
    super('Login');
  }


  async listarRegistroPorEmail(email){
    return  database[this.nomeModelo].findOne({where: {email: email}});
  }

}

module.exports = LoginServices;