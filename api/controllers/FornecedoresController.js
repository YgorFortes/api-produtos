const database = require('../models/index.js');

class FornecedorController{

  static async listarFornecedores(req, res) {
    try {
      const resultadoListaFornecedores = await database.Fornecedores.findAll(
        {
          include: {
            model: database.Produtos,
            atrrtibutes: [],
          }
        }
      );
      return res.status(200).json(resultadoListaFornecedores);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listarFonecedorPorId(req, res){
    const {id} = req.params;
    try {
      const resultadoFornecedorPorId = await database.Fornecedores.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Produtos,
            atrrtibutes: [],
          }
        })
        return res.status(200).json(resultadoFornecedorPorId)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criarFornecedor(req, res){
    const {novoFornecedor} = req.body;
    try {
      const novoFornecedorCriado = await database.Fornecedores.create(novoFornecedor);
      return res.status(201).json(novoFornecedorCriado);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarFornecedor(req, res){
    const {id} = req.params;
    const novaInforFornecedor = req.body;
    try {
      await database.Fornecedores.update(novaInforFornecedor,
        {
          where: {id: Number(id)}
        }
      )
      const fornecedorAtualizado = await database.Fornecedores.findOne(
        {
          where: {id: Number(id)}
        }
      )
      return res.status(200).json(fornecedorAtualizado)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async deletarFornecedor(req, res){
    const {id} = req.params;
    try {
      await database.Fornecedores.destroy( 
        {
          where: {id: Number(id)}
        }
      )
      res.status(200).json({mensagem: `Id ${id} deletado com sucesso`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }


}

module.exports = FornecedorController;