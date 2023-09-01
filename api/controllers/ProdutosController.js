const database = require('../models/index.js');

class ProdutosController{

  static async listarProdutos(__, res){

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

  static async criarProduto(req, res){
    const {fornecedores, ...infoNovoProduto} = req.body;

    try {
      const novoProduto = await database.Produtos.create(infoNovoProduto);
      novoProduto.setFornecedores(fornecedores);
      return res.status(200).json(novoProduto);
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizarProduto(req, res){
    const {fornecedores, infoProduto} = req.body;
    const {id} = req.params;
    try {
      await database.Produtos.update(infoProduto, 
        {
          where: {id : Number(id)}
        }
      )

      const produtoAtualizado = await database.Produtos.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Fornecedores,
            as: "fornecedores",
            attributes:  ['nome','endereco','telefone','cnpj'],
          }
        }
      )
      produtoAtualizado.setFornecedores(fornecedores);
      return res.status(200).json(produtoAtualizado)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletarProduto(req, res){
    const {id} = req.params;
    try {
      await database.Produtos.destroy(
        {
          where: {id: Number(id)}
        }
      );

      return res.status(201).json({mensagem: `Id: ${id} deletado`});
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = ProdutosController;