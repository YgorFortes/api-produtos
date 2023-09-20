const Services = require('./services.js');
const database = require('../models/index.js');
const { where } = require('sequelize');

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

  async atualizarRegistro(id, novaInformacao, transacao = {}){
    return database[this.nomeModelo].update(novaInformacao,  {where: {id: Number(id)}, transacao })
  }
}

module.exports = VendasServices;