const database = require('../models/index.js');
const {ItemVendasServices} = require('../services/index.js');
const {verificaCamposVazios, resgatarIdLogin, verificaId} = require('../helpers/helpers.js');
const itemVendasServices = new ItemVendasServices;

class ItemVendasController{

  static async listarItemVendas(__, res, next){
    try {

      //Busca ItemVendas
      const resultadolistarItemVendas = await itemVendasServices.listarTodosOsRegistros();
      
      //Verifica ItemVendas existe
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

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca ItemVenda por id
      const resultadoListaItemVendasPorId =await itemVendasServices.listarRegistroPorId(id);

      //Verifica se existe o itemVenda
      if(!resultadoListaItemVendasPorId){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoListaItemVendasPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarItemVendasPorFiltro(req, res, next){
    try {

      //Busca ItemVenda por id
      const resultadoFiltro = await itemVendasServices.listarRegistroPorFiltro(req.query);
      
      //Verifica se existe o itemVenda
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }


  static async atualizarItemVenda(req, res, next){
    const {id} = req.params;
    const novaInfoItemVenda = req.body;
    try{

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }
      
      //Busca ItemVenda por id
      const resultadoListaItemVendasPorId =await itemVendasServices.listarRegistroPorId(id);

      //Verifica se existe o itemVenda
      if(!resultadoListaItemVendasPorId){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }


      const itemVendaAtualizado = await itemVendasServices.atualizarRegistro(id, novaInfoItemVenda);

      
      //Verifica se pessoa foi cadastrada com sucesso
      if(!itemVendaAtualizado){
        return res.status(409).json({mensagem: 'ItemVenda não atualizada'});
      }


      return res.status(200).json(itemVendaAtualizado);
    } catch(erro){
      next(erro);
    }
  }

  static async deletarItemVenda(req, res , next){
    const {id} = req.params;
    
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca ItemVenda por id
      const resultadoListaItemVendasPorId =await itemVendasServices.listarRegistroPorId(id);

      //Verifica se existe o itemVenda
      if(!resultadoListaItemVendasPorId){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      //Deleta itemVenda
      const deletado = await itemVendasServices.deletarRegistro(id);

      //Verifica se itemVenda foi deletado
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

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Restaura itemVenda por id 
      const restaurado =  await itemVendasServices.restaurarRegistro(id);


      //Verifica se restaurou 
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