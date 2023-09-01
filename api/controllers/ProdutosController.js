const database = require('../models/index.js');

class ProdutosController{

  static async listarProdutos(req, res){

    try {
      const resultadoListaProdutos = await database.Produtos.findAll(
        {
          include: {
            model: database.Fornecedores,
            as: "fornecedores",
            attributes: ['nome','endereco','telefone','cnpj'],
          }
        }
      );
      return res.status(200).json(resultadoListaProdutos);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listaProdutoPorId(req, res){
    const {id} = req.params;

    try {
      const resultadoProdutoId = await database.Produtos.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Fornecedores,
            as: "fornecedores",
            attributes:  ['nome','endereco','telefone','cnpj'],
          }
        }
      );
      return res.status(200).json(resultadoProdutoId)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = ProdutosController;