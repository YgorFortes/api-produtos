const {VendasServices} = require('../services/index.js');
const database = require('../models');
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
    try{
      const resultadoFiltro = await vendasServices.listarRegistroPorFiltro(req.query);

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

    try {
      const novoItemVendaCriado = await vendasServices.criarRegistro(novaVenda, idProduto, quantidadeProdutoComprado); 
      
      return res.status(200).json(novoItemVendaCriado);
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


module.exports = VendasController;


 
