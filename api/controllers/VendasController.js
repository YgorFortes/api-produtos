const {VendasServices} = require('../services/index.js');
const database = require('../models')
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;
const vendasServices = new VendasServices;

const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');

class VendasController{

  static async listarVendas(__, res, next){
    try {
      const listarResultadoVendas = await vendasServices.listarTodosOsRegistros();

      if(listarResultadoVendas.length <1){
        return res.status(500).json({mensagem: "Vendas não encontrado"});
      }

      return res.status(200).json(listarResultadoVendas);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarVendaPorId(req, res, next) {
    const {id} = req.params;
    try {
      const listarVendaPorId = await vendasServices.listarRegistroPorId(id)

      if(listarVendaPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
    
      return res.status(200).json(listarVendaPorId)
    } catch (erro) {
      next(erro);
    }
  }

  static async listarVendaPorFiltro(req, res, next){
    const where = filtro(req.query);
    try{
      const resultadoFiltro = await vendasServices.listarRegistroPorFiltro(where)

      if(resultadoFiltro.length <1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      next(erro);
    }
  }

  static async criarVenda(req, res, next) {
    const novaVenda = req.body;
    const {idProduto, quantidadeProdutoComprado} = req.params;
    let quantidadeVendido = 0;
    let conteudo = {}
 
    try {
      database.sequelize.transaction(async transacao => {
        const novaVendaCriada = await database.Vendas.create(novaVenda , {transaction: transacao});
        const produto = await database.Produtos.findByPk(idProduto, {transaction: transacao});

        const quantidadeProduto = produto.quantidade;
        

        if(quantidadeProdutoComprado <= quantidadeProduto){
          quantidadeVendido = Number(quantidadeProdutoComprado)
        } else {
          return res.status(500).json({mensagem: 'Sem estoque na quantidade desejada'});
        }     
     
       
        const valorTotal = (quantidadeVendido * produto.valor) 
        const idVendaCriada = novaVendaCriada.id;
        const produtoId = produto.id;
    
        conteudo = {quantidade: quantidadeVendido, valor : valorTotal, venda_id: idVendaCriada, produto_id:  produtoId};


        const quantidadeAtual =  ( quantidadeProduto - Number(quantidadeProdutoComprado) );

        const novoItemVendaCriado = await database.ItemVendas.create(conteudo, {transaction: transacao});

        database.Produtos.update({quantidade: Number(quantidadeAtual)}, { where: {id : Number(produtoId)}}, {transaction: transacao});

        return res.status(200).json(novoItemVendaCriado);
      })
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarVenda(req, res, next ){
    const {id} = req.params;
    const novaInfoVenda = req.body;

    try {
      await vendasServices.atualizarRegistro(id, novaInfoVenda);

      const novaVendaAtualizada = await vendasServices.listarRegistroPorId(id);
      if(novaVendaAtualizada === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(novaVendaAtualizada)
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarVenda(req, res, next ){
    const {id} = req.params;
    try {
      const vendaDeletada= await vendasServices.deletarRegistro(id);

      if(!vendaDeletada){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
      return res.status(200).json({mensage: `Id: ${id} deletado`}) ;
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarVenda(req, res, next){
    const {id} = req.params;
    try {
      const vendaRestaurada = await vendasServices.restaurarRegistro(id);
      if(!vendaRestaurada){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }
}

function formatarData(data){
  if(data){
    const dataFormatoBrasil = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    return dataFormatoBrasil
  }
  return data = ""

} 


function filtro(parametros){
  const {dataPagamento, dataEntrega, dataVenda, nomePessoa,  dataInicial, dataFinal, nomeData} = parametros;
  
  let where = {};

  if(dataPagamento) where.data_pagamento = dataPagamento;
  if(dataEntrega) where.data_entrega = dataEntrega;
  if(dataVenda) where.data_venda = dataVenda;

  if(nomePessoa) {
    const include = associacaoInclude(database.Pessoas, "nome", nomePessoa);
    return {where, include}
    
  }


  dataInicial ||dataFinal ? where[nomeData] = {}  :  null;
  dataInicial ? where[nomeData][Op.gte] =  formatarData(dataInicial): null;
  dataFinal ? where[nomeData][Op.lte] = formatarData(dataFinal) : null;


  return {where}
  
}
module.exports = VendasController;


 
