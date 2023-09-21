const database = require('../models/index.js');
const {IntemVendasServices} = require('../services/index.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')
const itemVendasServices = new IntemVendasServices;

class ItemVendasController{

  static async listarItemVendas(__, res, next){
    try {
      const resultadolistarItemVendas = await itemVendasServices.listarTodosOsRegistros();

      if(resultadolistarItemVendas.length < 1){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
      
      return res.status(200).json(resultadolistarItemVendas);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarItemVendasPorId(req, res, next){
    const {id} = req.params;
    try {
      const resultadoListaItemVendasPorId =await itemVendasServices.listarRegistroPorId(id);

      if(resultadoListaItemVendasPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoListaItemVendasPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarItemVendasPorFilro(req, res, next){
    try {

      const resultadoFiltro = await itemVendasServices.listarRegistroPorFiltro(req.query)
  
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }


  /* static async atualizarItemVenda(req, res, next){
    const {id} = req.params;
    const novaInfoItemVenda = req.body;
    try{
     const itemVendaAtualizado = await itemVendasServices.atualizarRegistro(id, novaInfoItemVenda);
      return res.status(200).json(itemVendaAtualizado);
    } catch(erro){
      next(erro);
    }
  } */

  static async deletarItemVenda(req, res , next){
    const {id} = req.params;
    
    try {
      const deletado = await itemVendasServices.deletarRegistro(id);

      if(!deletado){
        return res.status(500).json({mensagem: "Id não deletado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarItemVendas(req, res , next){
    const {id} = req.params;
    try {
     const restaurado =  await itemVendasServices.restaurarRegistro(id);

     if(!restaurado){
      return res.status(500).json({mensagem: "Id não restaurado"});
    }

      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

}


module.exports = ItemVendasController;