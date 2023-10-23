const {ProdutosServices} =  require("../services/index.js");
const {verificaCamposVazios, resgatarIdLogin, verificaId} = require('../helpers/helpers.js');
const produtosServices = new ProdutosServices;


class ProdutosController{

  static async listarProdutos(__, res, next){

    try {
      //Buscando produtos em estoque
      const resultadoListaProdutos = await produtosServices.listarTodosOsProdutosEmEstoque();

      //Verifica se existe produtos
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

      //Busca produtos todos os produtos, até os sem  estoque
      const resultadoListaProdutos = await produtosServices.listarTodosOsRegistros();

      //Verifica se existe produtos
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

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca produtos por id 
      const resultadoProdutoId = await produtosServices.listarRegistroPorId(id);

      //Verifica se o produto existe
      if(!resultadoProdutoId){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoProdutoId)
    } catch (erro) {
      next(erro);
    }
  }

  static async listarProdutoPorFiltro(req, res, next){
    try {

      //Busca produto por filtro
      const resultadoFiltro = await produtosServices.listarRegistroPorFiltro(req.query);
      
      //Verifica se o produto existe
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }


  static async criarProduto(req, res, next){
    const {nome, modelo, marca, fornecedor_id, valor, quantidade} = req.body;
    
    //Criando objeto de produto
    const produto = {
      nome: nome,
      modelo: modelo,
      marca: marca,
      valor: valor, 
      quantidade: quantidade
    }

    //Criando where para procurar se é igual
    const where = {
      nome : nome,
      modelo: modelo,
      marca: marca
    }

    try {

      //Verificando os campos vazios
      const campos = ['nome', 'valor', 'modelo', 'marca', 'quantidade', 'fornecedor_id'];
      const erroCampos = verificaCamposVazios(req.body, campos);
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }

      //Busca ou cria o registro de produto
      const [novoProduto, criado] = await produtosServices.criarRegistroOuEncontrar(produto, where);

      //Verifica se foi criado
      if(!criado){
        return res.status(409).send({mensagem: 'Produto já cadastrado'})
      }

      //Associa o fornecedor_id com produto
      await novoProduto.setFornecedores(fornecedor_id);

      return res.status(200).json(novoProduto);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarProduto(req, res, next){
    const {fornecedor_id, ...infoProduto} = req.body;
    const {id} = req.params;

    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Verificando se o produto existe
      const produtoExiste = await produtosServices.listarRegistroPorId(id);

      if(!produtoExiste){
        return res.status(404).json({mensagem: 'Produto não existe'});
      }

      //Atualizando produto
      const resultado = await produtosServices.atualizarRegistro(id, infoProduto);

      // Verifica se a atualização foi bem sucedida
      if(!resultado){
        return res.status(409).json({mensagem: 'Produto não atualizado'});
      }

      //Associa o fornecedor_id com produto
      await produtoExiste.setFornecedores(fornecedor_id);

      //Buscando o produto atualizado 
      const produtoAtualizado = await produtosServices.listarRegistroPorId(id);

      return res.status(200).json(produtoAtualizado);     
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarProduto(req, res, next){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Verificando se o produto existe
      const produtoExiste = await produtosServices.listarRegistroPorId(id);
      if(!produtoExiste){
        return res.status(404).json({mensagem: 'Produto não existe'});
      }

      //Deleta produto
      const produtoDeletado = await produtosServices.deletarRegistro(id);

      //Verifica se produto deletou
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
      
      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //restaura produto
      const produtoRestaurado = await produtosServices.restaurarRegistro(id);
      
      //Verifica se produto foi restaurado
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

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Verificando se o produto existe
      const produtoExiste = await produtosServices.listarRegistroPorId(id);
      if(!produtoExiste){
        return res.status(404).json({mensagem: 'Produto não existe'});
      }


      //Desativando produto sem estoque
      const produtoDesativado = await produtosServices.desativarProdutoSemEstoque(id);

      //Verificando se desativou
      if(!produtoDesativado){
        return res.status(500).json({mensagem: "Produto não desativado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} desativado`})
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = ProdutosController;