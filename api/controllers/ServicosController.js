const database = require("../models/index.js");
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')

class ServicosController {

  static async listarServicos(__,res, next){
    try {
      const resultadoListaServicos = await database.Servicos.findAll({
        include: {
          model: database.Pessoas,
          attributes: ['id','nome','cpf'],
        }
      });

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
      const resultadoServicoPorId = await database.Servicos.findOne({
        where: {id: Number(id)},
        include: {
          model: database.Pessoas,
          attributes: ['id','nome','cpf'],
        }
      })

      if(resultadoServicoPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoServicoPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarServicosPorFiltro(req, res, next){
    const where = filtros(req.query);
    
    try {
      const resultadoPorFiltro = await database.Servicos.findAll({...where});
      console.log(resultadoPorFiltro)
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
      const novoServico = await database.Servicos.create(infoServico);
      return res.status(201).json(novoServico);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarServico(req, res, next){
    const {id} = req.params;
    const novaInforServico = req.body;
    try {
      const novaInfo = await database.Servicos.update(novaInforServico,
        {
          where: {id: Number(id)}
        }
      );
      
      const novoServicoAtualizado = await database.Servicos.findOne(
        {
          where: {id: Number(id)}
        }
      );

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
      const servicoDeletado = await database.Servicos.destroy(
        {
          where: {id: Number(id)}
        }
      );
      
      if(servicoDeletado === null){
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
      const servicoRestaurado = await database.Servicos.restore(
        {
          where:{ id: Number(id)}
        }
      )

      if(servicoRestaurado === null){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

}

function filtros(parametros){
  const {tipo, dataEntrega, pessoaId, nomePessoa} = parametros;
  let  where = {};
  if(tipo ) where.tipo = tipo ;
  if(dataEntrega) where.data_entrega = dataEntrega ;
  if(pessoaId)  where.pessoa_id = pessoaId ;

  if(nomePessoa) {
    const include = associacaoInclude(database.Pessoas, "nome", nomePessoa);
    return {where, include}
  }
  
  return {where}
}



module.exports = ServicosController;