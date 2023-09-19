const database = require('../models/index.js');

class ItemVendasController{

  static async listarItemVendas(__, res, next){
    try {
      const resultadolistarItemVendas = await database.ItemVendas.findAll(
        {
          include:
          [
            {model: database.Produtos, attributes: ['nome', 'valor']},
            {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
          ]
    
        }
      );
      return res.status(200).json(resultadolistarItemVendas);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarItemVendasPorId(req, res, next){
    const {id} = req.params;

    try {
      const resultadoListaItemVendasPorId =await database.ItemVendas.findOne(
        {
          where: {id: Number(id)},
          include:
          [
            {model: database.Produtos, attributes: ['nome', 'valor']},
            {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
          ]
        }
      )
      return res.status(200).json(resultadoListaItemVendasPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async criarItemVendas(req, res, next){
    const novoItemVenda = req.body;

    try {
      const novoItemVendaCriado = await database.ItemVendas.create(novoItemVenda);
      return res.status(201).json(novoItemVendaCriado)
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarItemVenda(req, res, next){
    const {id} = req.params;
    const novaInfoItemVenda = req.body;
    try{
      await database.ItemVendas.update(novaInfoItemVenda,
        {
          where: {id : Number(id)}
        }
      );

      const ItemVendaAtualizado = await database.ItemVendas.findOne(
        {
          where: {id: Number(id)},
          include:
          [
            {model: database.Produtos, attributes: ['nome', 'valor']},
            {model: database.Vendas, attributes: ['data_pagamento', 'data_entrega', 'data_venda']}
          ]
        }
      );
      return res.status(200).json(ItemVendaAtualizado)
    } catch(erro){
      next(erro);
    }
  }

  static async deletarItemVenda(req, res , next){
    const {id} = req.params;
    
    try {
      await database.ItemVendas.destroy(
        {
          where: {id: Number(id)}
        }
      )
      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarItemVendas(req, res , next){
    const {id} = req.params;
    try {
      await database.ItemVendas.restore(
        {
          where:{ id: Number(id)}
        })
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

}


module.exports = ItemVendasController;