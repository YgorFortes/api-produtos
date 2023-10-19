const Services = require('./services.js');
const database = require('../models/index.js');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;
const formatarData = require('../funcoesEspecificas/formatarData.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');


class VendasServices extends Services{
  constructor(){
    super('Vendas');
    this.produtos = new Services('Produtos');
    this.itemVenda = new Services('ItemVendas');
    this.pessoas = new  Services('Pessoas');
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

  async listarRegistroPorFiltro(parametros){
    const {data_pagamento, data_entrega, data_venda, nomePessoa,  data_inicial, data_final, nomeData} = parametros;
  
    let where = {};

    if(data_pagamento) where.data_pagamento = data_pagamento;
    if(data_entrega) where.data_entrega = data_entrega;
    if(data_venda) where.data_venda = data_venda;

    if(nomePessoa) {
      const include = associacaoInclude(database.Pessoas, "nome", nomePessoa);
      return database[this.nomeModelo].findAll({where, include});
    }

    data_inicial ||data_final ? where[nomeData] = {}:  null;
    data_inicial ? where[nomeData][Op.gte] =  formatarData(data_inicial): null;
    data_final ? where[nomeData][Op.lte] = formatarData(data_final) : null;


    const verificaWhereVazio = Object.keys(where).length;
    if(verificaWhereVazio <1){
      return  [];
    }
    
    return database[this.nomeModelo].findAll({where});
    
  }

  async criarRegistro(data_pagamento, data_entrega, data_venda, idProduto, quantidadeProdutoComprado, idLogin){
    let quantidadeVendido = 0;
    let where = {};
    console.log(idLogin)
    return database.sequelize.transaction(async transacao => {

      //Buscando o id de pessoa pelo id de login
      const pessoa = await  database.Pessoas.findOne({where: {login_id: idLogin}});

      const pessoaId = pessoa.id;
 
      //Cria uma nova venda de associada a pessoa logada
      const novaVendaCriada = await database[this.nomeModelo].create({data_pagamento,data_entrega, data_venda,  pessoa_id: pessoaId} ,{transaction: transacao});

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

      //Pega o id de venda criada
      const idVendaCriada = novaVendaCriada.id;

      //Pega a id de produto
      const produtoId = produto.id;

      //Calcula a quantidade atual do produto comprado
      const quantidadeAtual = (quantidadeProduto - quantidadeProdutoComprado);

      //Atualiza a quantidade atual em produto
      const resultado =  await this.produtos.atualizarRegistro(idProduto, {quantidade: quantidadeAtual},  {transaction: transacao});

      //Coloca valores necesários em where para criar o itemVenda
      where = {quantidade: quantidadeVendido, valor : Number(valorTotal.toFixed(2)), venda_id: idVendaCriada, produto_id:  produtoId};

      //Cria um registro em itemVenda com os valore do objeto where
      const novoItemVendaCriado = await this.itemVenda.criarRegistro(where, {transaction: transacao});
      

     if(resultado.length < 1){
      return {mensagem: 'Compra não finalizada'}
     }
     
      return novoItemVendaCriado; 
    });
   
  }

  async listarVendasLogado(idLogin){
    return  database.Vendas.findAll({
      include: [{
        model: database.Pessoas,
        where: { login_id: idLogin},
        attributes:  ['id','nome', 'cpf','funcao'],
      }]
    });
  }

}


module.exports = VendasServices;