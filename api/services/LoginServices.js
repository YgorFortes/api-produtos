const database = require('../models/index.js');
const Services = require('./services.js');


class LoginServices extends Services{
  constructor(){
    super('Login');
  }


  async listarRegistroPorEmail(email){
    return  database[this.nomeModelo].findOne({where: {email: email}});
  }
  
  async listaPessoaPeloLoginPorEmail(email){
    return database[this.nomeModelo].findOne({
      where: {email: email },
      include: [{
        model: database.Pessoas,
      }]
    });

  }
}
module.exports = LoginServices;