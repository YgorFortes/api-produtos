const database = require('../models/index.js');
const Services = require('./services.js');

class IntemVendasService extends Services{
  constructor(){
    super('ItemVendas');
  }

  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll(
      {
        include:
        [
          {model: database.Produtos, attributes: ['nome', 'valor']},
          {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
        ]
      }
    )
  }

  async listarRegistroPorId(id){
    return database[this.nomeModelo].findOne({
      where: {id: Number(id)},
        include:
        [
          {model: database.Produtos, attributes: ['nome', 'valor']},
          {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
        ]
    });
  }

  async atualizarRegistro(id, novaInformacao){
  
    await database[this.nomeModelo].update(novaInformacao, {where: {id: Number(id)}});
    

    return database[this.nomeModelo].findOne({
      where: {id: Number(id)},
        include:
        [
          {model: database.Produtos, attributes: ['nome', 'valor']},
          {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
        ]
    });
     
  }
}

module.exports = IntemVendasService;