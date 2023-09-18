const database = require ('../models/index.js');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;

const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');

class VendasController{

  static async listarVendas(__, res, next){
    try {
      const listarResultadoVendas = await database.Vendas.findAll(
        {
          include: {
            model: database.Pessoas,
            attributes: ['nome','cpf'],
          }
        }
      );

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
      const listarVendaPorId = await database.Vendas.findOne(
        {
          where: {id : Number(id)},
          include: {
            model: database.Pessoas,
            attributes: ['nome','cpf'],
          }
        }
      );

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
      const resultadoFiltro = await database.Vendas.findAll({...where})

      if(resultadoFiltro.length <1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      next(erro);
    }
  }

  static async criarVenda(req, res) {
    const {novaVenda} = req.body;
    try {
      const novaVendaCriada = await database.Vendas.create(novaVenda);
      return res.status(201).json(novaVendaCriada);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarVenda(req, res, next ){
    const {id} = req.params;
    const novaInfoVenda = req.body;
    try {
      await database.Vendas.update(novaInfoVenda,
        {
          where: {id: Number(id)}
        }
      );
      const novaVendaAtualizada = await database.Vendas.findOne(
        {
          where: {id: Number(id)}
        }
      );

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
      const vendaDeletada= await database.Vendas.destroy(
        {
          where: {id: Number(id)}
        }
      );

      if(!vendaDeletada){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
      return res.status(200).json({mensage: `Id: ${id} deletado`}) 
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarVenda(req, res, next){
    const {id} = req.params;
    try {
     const vendaRestaurada = await database.Vendas.restore(
        {
          where:{ id: Number(id)}
        }
      )

      if(!vendaRestaurada){
        return res.status(500).json({mensagem: "Id não deletado"});
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


 
