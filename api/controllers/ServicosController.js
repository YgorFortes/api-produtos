const { NUMBER } = require("sequelize");
const database = require("../models/index.js");

class ServicosController {

  static async listarServicos(req,res){
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
        console.log(novoServicoAtualizado);
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
  
}

module.exports = ServicosController;