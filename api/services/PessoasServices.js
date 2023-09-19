const Services = require('./services.js');
const database = require('../models/index.js')
class PessoasServices extends Services{
  constructor(){
    super('Pessoas');
  }

  async listarTodos(){
    return database[this.nomeModelo].scope('todas').findAll();
  }

  async listarRegistroDesativados(){
    return database[this.nomeModelo].scope('desativados').findAll();
  }

  
}

module.exports = PessoasServices;