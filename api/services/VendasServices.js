const Services = require('./services.js');
const database = require('../models/index.js');
const { where } = require('sequelize');

class VendasServices extends Services{
  constructor(){
    super('Vendas');
    this.produtos = new Services('Produtos');
    this.itemVenda = new Services('ItemVendas');
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

  async criarRegistro(novaVenda, idProduto, quantidadeProdutoComprado){
    let quantidadeVendido = 0;
    let where = {}
   
    return database.sequelize.transaction(async transacao => {
      const novaVendaCriada = await database[this.nomeModelo].create(novaVenda, {transaction: transacao});
      const produto = await this.produtos.listarRegistroPorId(idProduto, {transaction: transacao});

      const quantidadeProduto = produto.quantidade;

       if(quantidadeProdutoComprado <= quantidadeProduto){
        quantidadeVendido = Number(quantidadeProdutoComprado);
      }else {
        return {mensagem: 'Sem estoque na quantidade desejada'}
      }

      const valorTotal = (quantidadeVendido * produto.valor);
      const idVendaCriada = novaVendaCriada.id;
      const produtoId = produto.id;

      where = {quantidade: quantidadeVendido, valor : valorTotal.toFixed(2), venda_id: idVendaCriada, produto_id:  produtoId};

      const quantidadeAtual = (quantidadeProduto - Number(quantidadeProdutoComprado));
      const novoItemVendaCriado = await this.itemVenda.criarRegistro(where, {transaction: transacao});
      await this.produtos.atualizarRegistro({quantidade: Number(quantidadeAtual)}, 
      {
        where: {id: Number(produtoId)}
      }, {transaction: transacao});

      return novoItemVendaCriado; 
    });
   
  }

  async atualizarRegistro(id, novaInformacao, transacao = {}){
    return database[this.nomeModelo].update(novaInformacao,  {where: {id: Number(id)}, transacao })
  }
}

module.exports = VendasServices;