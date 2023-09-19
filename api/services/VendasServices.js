const Services = require('./services.js');
const database = require('../models/index.js');

class VendasServices extends Services{
  constructor(){
    super('Vendas');
  }
  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll({include: {
      model: database.Pessoas,
      attributes: ['nome','cpf'],
    }});
  }

  async listarRegistroPorId(id){
    return  database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Pessoas,
          attributes: ['nome','cpf'],
        }
      } 
    );
  }
}

module.exports = VendasServices;