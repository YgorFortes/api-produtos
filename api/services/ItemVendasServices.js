const database = require('../models/index.js');
const Services = require('./services.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')

class IntemVendasService extends Services{
  constructor(){
    super('ItemVendas');
    this.produtos = new Services('Produtos');
    this.pessoas = new  Services('Pessoas');
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

  async criarRegistro(parametros){
    const {idProduto, quantidadeProdutoComprado, idLogin, idVenda } = parametros;
    
    let quantidadeVendido = 0;
    let where = {};
    console.log(idLogin)
    return database.sequelize.transaction(async transacao => {


      //Busca o produto de acordo com a id de produto
      const produto = await this.produtos.listarRegistroPorId(idProduto, {transaction: transacao});

      //Busca a quantidade de item de produto
      const quantidadeProduto = produto.quantidade;

      //Diminui a quantidade de itens pela quantidade comprada
      if(quantidadeProdutoComprado <= quantidadeProduto){
        quantidadeVendido = Number(quantidadeProdutoComprado);
      }else {
        return {mensagem: 'Sem estoque na quantidade desejada'}
      }


      //Faz a soma total do item comprado 
      const valorTotal = (Number(quantidadeVendido) * produto.valor);

    

      //Pega a id de produto
      const produtoId = produto.id;

      //Calcula a quantidade atual do produto comprado
      const quantidadeAtual = (quantidadeProduto - quantidadeProdutoComprado);

      //Atualiza a quantidade atual em produto
      const resultado =  await this.produtos.atualizarRegistro(idProduto, {quantidade: quantidadeAtual},  {transaction: transacao});

      //Coloca valores necesários em where para criar o itemVenda
      where = {quantidade: quantidadeVendido, valor : Number(valorTotal.toFixed(2)), venda_id: Number(idVenda), produto_id:  produtoId};

      //Cria um registro em itemVenda com os valore do objeto where
      console.log(this.nomeModelo)
      const novoItemVendaCriado = await database[this.nomeModelo].create(where, {transaction: transacao});
      

     if(resultado.length < 1){
      return {mensagem: 'Compra não finalizada'}
     }
     
      return novoItemVendaCriado; 
    });
   
  }

  
}

module.exports = IntemVendasService;