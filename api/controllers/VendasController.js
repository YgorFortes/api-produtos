const { where } = require('sequelize');
const database = require ('../models/index.js');

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

  static async criarVenda(req, res) {
    const novaVenda = req.body;
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
}

module.exports = VendasController;