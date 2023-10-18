const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')
const {ServicosServices} =  require("../services/index.js");
const servicosServices = new ServicosServices;
const database = require('../models/index.js');
const {verificaCamposVazios, resgatarIdLogin} = require('../helpers/helpers.js');
class ServicosController {
  static async listarServicos(__,res, next){
    try {
      const resultadoListaServicos = await servicosServices.listarTodosOsRegistros();

      if(resultadoListaServicos.length <1 ){
        return res.status(500).json({mensagem: "Serviços não encontrado"});
      }

      return res.status(200).json(resultadoListaServicos)
    } catch (erro) {
      next(erro);
    }
  }

  static async listaServicosPorId(req,res, next){
    const {id} = req.params;

    try {
      const resultadoServicoPorId = await servicosServices.listarRegistroPorId(id);

      if(resultadoServicoPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoServicoPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarServicosPorFiltro(req, res, next){
    try {
      const resultadoPorFiltro = await servicosServices.listarRegistroPorFiltro(req.query);
      
      if(resultadoPorFiltro.length <1 ){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      res.status(200).json(resultadoPorFiltro)
    } catch (erro) {
      next(erro);
    }
  }

  static async criarServico (req, res, next){
    const infoServico = req.body;
    try {
      const novoServico = await servicosServices.criarRegistro(infoServico);
      return res.status(201).json(novoServico);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarServico(req, res, next){
    const {id} = req.params;
    const novaInforServico = req.body;
    try {
      await servicosServices.atualizarRegistro(id, novaInforServico)
      
      const novoServicoAtualizado = await servicosServices.listarRegistroPorId(id);

      if(novoServicoAtualizado === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
    
      return res.status(200).json(novoServicoAtualizado);
    } catch (erro) {
      next(erro);;
    }
  }

  static async deletarServico(req, res, next){
    const {id} = req.params;
    try {
      const servicoDeletado = await servicosServices.deletarRegistro(id)
      
      if(!servicoDeletado ){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
    

      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarServico(req, res, next){
    const {id} = req.params;
    try {
      const servicoRestaurado = await servicosServices.restaurarRegistro(id)

      if(!servicoRestaurado ){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

  static async listarServicoDaPessoaLogado(req, res){
    try {
      //Resgatando id de login pelo token
      const idLogin = await resgatarIdLogin(req);

      const servicosPessoaLogada = await servicosServices.listarRegistroDaPessoaLogada(idLogin);

      //Verifica se existe serviço pela pessoa logada
      if(servicosPessoaLogada.length <1 ){
        return res.status(404).send({mensagem: 'Nenhum serviço associado a esta pessoa.'})
      }
      return res.status(200).send(servicosPessoaLogada) ;
    } catch (erro) {
      
    }
   

  }

}




module.exports = ServicosController;