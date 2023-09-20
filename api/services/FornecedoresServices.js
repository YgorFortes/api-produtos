const Services = require('./services.js');
const database = require('../models/index.js');
const produtos = require('../models/produtos.js');

class FornecedoresServices extends Services{
  constructor(){
    super('Fornecedores');
  }

  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll({
      include: {
        model: database.Produtos,
        as: "produtos",
        attributes: ['nome','valor','marca','modelo'],
      },
    })
  }
  

  async listarRegistroPorId(id){
    return database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Produtos,
           as: "produtos",
          attributes: ['nome','valor','marca','modelo'],
        }
      }
    )
  }

  async atualizarRegistro(id, produtos, novaInformacao){
  
    await database[this.nomeModelo].update(novaInformacao, {where: {id: Number(id)}});
    const fornecedor = await database[this.nomeModelo].findByPk(id);
   
   if(produtos){
      await fornecedor.setProdutos(produtos);
    }else {
      await fornecedor.getProdutos(produtos);
    }
    

    return database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Produtos,
           as: "produtos",
          attributes: ['nome','valor','marca','modelo'],
        }
      }
    );
     
  }




}

module.exports = FornecedoresServices;

