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
  
}

module.exports = ServicosController;