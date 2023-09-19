const database = require('../models/index.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;;
class ProdutosController{

  static async listarProdutos(__, res, next){

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

      if(resultadoProdutoId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoProdutoId)
    } catch (erro) {
      next(erro);
    }
  }

  static async listarProdutoPorFiltro(req, res, next){
    const where = filtros(req.query);
    try {
      const resultadoFiltro = await database.Produtos.findAll({...where});
      
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
    console.log({...infoNovoProduto})
    try {
      const [novoProduto, criado] = await database.Produtos.findOrCreate(
        {
          where: 
          {
            nome : nome,
            modelo: modelo,
            marca: marca
          }, 
          defaults: {...infoNovoProduto}
        },
      );

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

      if(produtoAtualizado === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      produtoAtualizado.setFornecedores(fornecedores);
      return res.status(200).json(produtoAtualizado)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletarProduto(req, res, next){
    const {id} = req.params;
    try {
      const produtoDeletado = await database.Produtos.destroy(
        {
          where: {id: Number(id)}
        }
      );

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
      const produtoRestaurado = await database.Produtos.restore(
        {
          where:{ id: Number(id)}
        }
      )
      
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
      const desativarProdutoPorQuantidade = await database.Produtos.destroy({
        where: {id: Number(id), quantidade: {[Op.lte]: 0 }}
      });
      res.status(200).json(desativarProdutoPorQuantidade)
    } catch (erro) {
      next(erro);
    }
  }
}

function filtros(parametros){
  const {nome, modelo, marca, fornecedorId, nomeFornecedor} = parametros;
  let where = {};

  if(nome) where.nome = nome;
  if(modelo) where.modelo = modelo;
  if(marca) where.marca = marca;

  if(fornecedorId || nomeFornecedor  ) {
    const include = associacaoInclude(
      database.Fornecedores, "id" || "nome", 
      fornecedorId  || nomeFornecedor, 
      'FornecedorProduto',  
      'fornecedores');
    return where = {where, include}
 }

  return {where};
}

module.exports = ProdutosController;