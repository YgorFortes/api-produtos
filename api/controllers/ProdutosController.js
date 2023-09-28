const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');
const {ProdutosServices} =  require("../services/index.js");
const produtosServices = new ProdutosServices;


class ProdutosController{

  static async listarProdutos(__, res, next){

    try {
      const resultadoListaProdutos = await produtosServices.listarTodosOsProdutosEmEstoque();

      if(resultadoListaProdutos.length < 1){
        return res.status(500).json({mensagem: "Produtos não encontrado"});
      }

      return res.status(200).json(resultadoListaProdutos);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarTodosProdutos(__, res, next){
    try {
      const resultadoListaProdutos = await produtosServices.listarTodosOsRegistros();

      if(resultadoListaProdutos.length < 1){
        return res.status(500).json({mensagem: "Produtos não encontrado"});
      }

      return res.status(200).json(resultadoListaProdutos);
    } catch (erro) {
      next(erro);
    }
  }

  static async listaProdutoPorId(req, res, next){
    const {id} = req.params;

    try {
      const resultadoProdutoId = await produtosServices.listarRegistroPorId(id)

      if(resultadoProdutoId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoProdutoId)
    } catch (erro) {
      next(erro);
    }
  }

  static async listarProdutoPorFiltro(req, res, next){
    try {
      const resultadoFiltro = await produtosServices.listarRegistroPorFiltro(req.query);
      
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }
      res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }



  static async criarProduto(req, res, next){
    const {nome, modelo, marca, fornecedores, ...infoNovoProduto} = req.body;
    const where = {
      nome : nome,
      modelo: modelo,
      marca: marca
    }

    try {
      const [novoProduto, criado] = await produtosServices.criarRegistroOuEncontrar(infoNovoProduto, where);

      if(criado){
        await novoProduto.setFornecedores(fornecedores);
        return res.status(200).json(novoProduto);
      }else{
        return res.status(409).json({mensagem: 'Produto já cadastrado'});
      }

    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarProduto(req, res, next){
    const {fornecedores, ...infoProduto} = req.body;
    const {id} = req.params;

    try {
      const produtoAtualizado = await produtosServices.atualizarRegistro(id, fornecedores, infoProduto)
      
      return res.status(200).json( produtoAtualizado); 
      
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarProduto(req, res, next){
    const {id} = req.params;
    try {
      const produtoDeletado = await produtosServices.deletarRegistro(id)

      if(!produtoDeletado){
        return res.status(500).json({mensagem: "Id não deletado"});
      }

      return res.status(201).json({mensagem: `Id: ${id} deletado`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarProduto(req, res, next){
    const {id} = req.params;
    try {
      const produtoRestaurado = await produtosServices.restaurarRegistro(id)
      
      if(!produtoRestaurado){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }
  }

  static async desativarProdutoPorQuantidade(req, res, next){
    const {id} = req.params;
    try {
      const produtoDesativado = await produtosServices.desativarProdutoSemEstoque(id);

      if(!produtoDesativado){
        return res.status(500).json({mensagem: "Id não desativado"});
      }

      res.status(200).json({mensagem: `Id: ${id} desativado`})
    } catch (erro) {
      next(erro);
    }
  }
}


module.exports = ProdutosController;