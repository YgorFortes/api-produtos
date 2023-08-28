const database = require('../models/index.js');

class FornecedorController{

  static async listarFornecedores(req, res) {
    try {
      const resultadoListaFornecedores = await database.Fornecedores.findAll();
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
          where: 
          {
            id: Number(id)
          }
        })
        return res.status(200).json(resultadoFornecedorPorId)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criarFornecedor(req, res){
    const novoFornecedor = req.body;
    try {
      const novoFornecedorCriado = await database.Fornecedores.create(novoFornecedor);
      return res.status(201).json(novoFornecedorCriado);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = FornecedorController;