const Services = require('./services.js');
const database = require('../models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')

class ProdutosServices extends Services{
  constructor() {
    super('Produtos');
  }

  async listarTodosOsProdutosEmEstoque(){
    return database[this.nomeModelo].scope('estoque').findAll(
      {
        include: {
          model: database.Fornecedores,
          as: "fornecedores",
          attributes: ['nome','endereco','telefone','cnpj'],
        }
      }
    );
  }

  async listarRegistroPorId(id){
    return database[this.nomeModelo].findOne( 
      {
        where: {id: Number(id)},
        include: {
          model: database.Fornecedores,
          as: "fornecedores",
          attributes:  ['nome','endereco','telefone','cnpj'],
        }
     }
    )
  }

  async listarRegistroPorFiltro(parametros){
    const {nome, modelo, marca, fornecedorId, nomeFornecedor} = parametros;
    let where = {};
  
    if(nome) where.nome = nome;
    if(modelo) where.modelo = modelo;
    if(marca) where.marca = marca;
  

    if (fornecedorId || nomeFornecedor) {
      const include = associacaoInclude(
          database.Fornecedores,
          fornecedorId ? "id" : "nome",
          fornecedorId || nomeFornecedor,
          "FornecedorProduto",
          "fornecedores"
      );
      return database[this.nomeModelo].findAll({where, include});
    }


    return database[this.nomeModelo].findAll({where} );
  }

  async atualizarRegistro(id, fornecedores, novaInformacao){

    await database[this.nomeModelo].update(novaInformacao, {where: {id: Number(id)}});
    const produto = await database[this.nomeModelo].findByPk(id);
   
   if(fornecedores){
      await produto.setFornecedores(fornecedores);
    }else {
      await produto.getFornecedores(fornecedores);
    }
    
    return database[this.nomeModelo].findOne( 
      {
        where: {id: Number(id)},
        include: {
          model: database.Fornecedores,
          as: "fornecedores",
          attributes:  ['nome','endereco','telefone','cnpj'],
        }
     }
    );
     
  }

  async desativarProdutoSemEstoque(id){
   return database[this.nomeModelo].destroy({where: {id: Number(id), quantidade: {[Op.lte]: 0 }}});
  }



}

module.exports = ProdutosServices;