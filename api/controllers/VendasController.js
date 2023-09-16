const database = require ('../models/index.js');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;

const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');

class VendasController{

  static async listarVendas(__, res){
    try {
      const listarResultadoVendas = await database.Vendas.findAll(
        {
          include: {
            model: database.Pessoas,
            attributes: ['nome','cpf'],
          }
        }
      );
      return res.status(200).json(listarResultadoVendas);
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }

  static async listarVendaPorId(req, res) {
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
      return res.status(200).json(listarVendaPorId)
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }
  static async listarPorData(req, res){
    const {dataInicial, dataFinal}= req.query
    const where ={};
 
    dataInicial ||dataFinal ? where.data_pagamento = {}  :  null;
    dataInicial ? where.data_pagamento[Op.gte] =  dataInicial: null;
    dataFinal ? where.data_pagamento[Op.lte] =  dataFinal : null;
    console.log(req)
    try {
      const resultadoBusca = await database.Vendas.findAll({where})
      res.status(200).json(resultadoBusca);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  
  }

  static async listarVendaPorFiltro(req, res){
    const where = filtro(req.query);
    try{
      const resultadoFiltro = await database.Vendas.findAll({...where})
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async criarVenda(req, res) {
    const {novaVenda} = req.body;
    try {
      const novaVendaCriada = await database.Vendas.create(novaVenda);
      return res.status(201).json(novaVendaCriada);
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }

  static async atualizarVenda(req, res ){
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
      return res.status(200).json(novaVendaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }

  static async deletarVenda(req, res ){
    const {id} = req.params;

    try {
      await database.Vendas.destroy(
        {
          where: {id: Number(id)}
        }
      );
      return res.status(200).json({mensage: `Id: ${id} deletado`}) 
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }

  static async restaurarVenda(req, res){
    const {id} = req.params;
    try {
      await database.Vendas.restore(
        {
          where:{ id: Number(id)}
        })
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

}

function formatarData(data){
  const dataFormatoBrasil = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  return dataFormatoBrasil

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


 
