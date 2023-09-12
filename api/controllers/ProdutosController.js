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

  static async listarProdutoPorFiltro(req, res){
    const where =   filtro(req.query);
    try {
      const resultadoFiltro = await database.Produtos.findAll(where);
      res.status(200).json(resultadoFiltro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }



  static async criarProduto(req, res){
    const {nome, modelo, marca, fornecedores, ...infoNovoProduto} = req.body;

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

  static async restaurarProduto(req, res){
    const {id} = req.params;
    try {
      await database.Produtos.restore(
        {
          where:{ id: Number(id)}
        })
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }

  }
}

function filtro(parametros){
  const {nome, modelo, marca, fornecedorId} = parametros;
  let where = {};

  if(nome) where.nome = nome;
  if(modelo) where.modelo = modelo;
  if(marca) where.marca = marca;

  if(fornecedorId) {
  const include =  {  
    model: database.Fornecedores,
    through: "FornecedorProduto",
    as :'fornecedores',
    where: {id: fornecedorId}
   
  }
   return where = {where, include}
 }
  return where;
}

module.exports = ProdutosController;