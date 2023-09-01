const database = require('../models/index.js');

class FornecedorController{

  static async listarFornecedores(__, res) {
    try {
      const resultadoListaFornecedores = await database.Fornecedores.findAll(
        {
          include: {
            model: database.Produtos,
            as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          },
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
             as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          }
        })
        return res.status(200).json(resultadoFornecedorPorId)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criarFornecedor(req, res){
    const {produtos, ...informacaoNovoFornecedor} = req.body;

    try {
      const novoFornecedor = await database.Fornecedores.create(informacaoNovoFornecedor);
      await novoFornecedor.setProdutos(produtos)
      return res.status(200).json(novoFornecedor)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarFornecedor (req, res){
    const {id} = req.params;
    const {produtos, infoFornecedor} = req.body;

    try {
       await database.Fornecedores.update(infoFornecedor,
        {
          where: {id: Number(id)}
        }
      );

      const fornecedorAtualizadoEncontrado = await database.Fornecedores.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Produtos,
             as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          }
        },
      );
      await fornecedorAtualizadoEncontrado.setProdutos(produtos);
      res.status(200).json(fornecedorAtualizadoEncontrado);
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
      );
      res.status(200).json({mensagem: `Id ${id} deletado com sucesso`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

}


module.exports = FornecedorController;