const database = require('../models/index.js');
const Services = require('./services.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')

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

  async listarRegistroPorFiltro(parametros){
    const {idProduto, idVenda} = parametros;
  
    let where = {};
  
    if(idProduto) where.produto_id = idProduto;
    if(idVenda) where.venda_id = idVenda;
  
  
    if(idVenda) {
      const include = associacaoInclude(database.Vendas,"id", idVenda)
      return database[this.nomeModelo].findAll({where, include} );
    }
  
    if(idProduto) {
      const include = associacaoInclude(database.Produtos,"id", idProduto)
      return database[this.nomeModelo].findAll({where, include} );
    }
  
    const verificaWhereVazio = Object.keys(where).length;
    if(verificaWhereVazio <1){
      return  [];
    }

    return database[this.nomeModelo].findAll({where} );
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