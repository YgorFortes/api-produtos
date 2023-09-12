const database = require("../models/index.js");

class ServicosController {

  static async listarServicos(__,res){
    try {
      const resultadoListaServicos = await database.Servicos.findAll({
        include: {
          model: database.Pessoas,
          attributes: ['id','nome','cpf'],
        }
      });
      return res.status(200).json(resultadoListaServicos)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listaServicosPorId(req,res){
    const {id} = req.params;

    try {
      const resultadoServicoPorId = await database.Servicos.findOne({
        where: {id: Number(id)},
        include: {
          model: database.Pessoas,
          attributes: ['id','nome','cpf'],
        }
      })

      return res.status(200).json(resultadoServicoPorId);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listarServicosPorFiltro(req, res){
    const where = filtros(req.query);
    console.log(where)
    try {
      const resultadoPorFiltro = await database.Servicos.findAll(where );
      res.status(200).json(resultadoPorFiltro)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criarServico (req, res){
    const infoServico = req.body;
    try {
      const novoServico = await database.Servicos.create(infoServico);
      return res.status(201).json(novoServico);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarServico(req, res){
    const {id} = req.params;
    const novaInforServico = req.body;
    try {
      await database.Servicos.update(novaInforServico,
        {
          where: {id: Number(id)}
        });

      const novoServicoAtualizado = await database.Servicos.findOne(
        {
          where: {id: Number(id)}
        });
        return res.status(200).json(novoServicoAtualizado);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async deletarServico(req, res){
    const {id} = req.params;
    try {
      await database.Servicos.destroy(
        {
          where: {id: Number(id)}
        }
      );
      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async restaurarServico(req, res){
    const {id} = req.params;
    try {
      await database.Servicos.restore(
        {
          where:{ id: Number(id)}
        })
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }

  }

}

function filtros(parametros){
  const {tipo, dataEntrega, pessoaId, nomePessoa} = parametros;
  let  where = {}
  if(tipo) where.tipo = tipo ;
  if(dataEntrega) where.data_entrega = dataEntrega ;
  if(pessoaId)  where.pessoa_id = pessoaId ;

  if(nomePessoa) {
    const include = {
      model: database.Pessoas,
      where: {nome: nomePessoa}
    }
    return where = {where, include}
  }
  
  return where
}


module.exports = ServicosController;