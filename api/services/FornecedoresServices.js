const Services = require('./services.js');
const database = require('../models/index.js');
const formatarCnpj = require('../funcoesEspecificas/formatarCnpj.js');
const formataTelefone = require('../funcoesEspecificas/formatarTelefone.js');
const associacaoInclude = require ('../funcoesEspecificas/funcaoInclude.js');


class FornecedoresServices extends Services{
  constructor(){
    super('Fornecedores');
  }

  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll({
      include: {
        model: database.Produtos,
        as: "produtos",
        attributes: ['nome','valor','marca','modelo'],
      },
    })
  }
  

  async listarRegistroPorId(id){
    return database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Produtos,
           as: "produtos",
          attributes: ['nome','valor','marca','modelo'],
        }
      }
    )
  }

  async listarRegistroPorFiltro(parametros){
    const {nome, endereco, telefone, cnpj, nomeProduto, marcaProduto,  modeloProduto} = parametros;
    let where = {};
    if(nome) where.nome = nome;
    if(endereco) where.endereco = endereco;
    if(telefone) where.telefone = formataTelefone(telefone)
    if(cnpj) where.cnpj = formatarCnpj(cnpj);
  
    if (nomeProduto || marcaProduto || modeloProduto) {
        const include = associacaoInclude(
        database.Produtos,
        nomeProduto ? "nome" : marcaProduto ? "marca" : "modelo",
        nomeProduto || marcaProduto || modeloProduto,
        "FornecedorProduto",
        "produtos"
      );


      return database[this.nomeModelo].findAll({ where, include });
    }

    const verificaWhereVazio = Object.keys(where).length;
    if(verificaWhereVazio <1){
      return  [];
    }
  
    return database[this.nomeModelo].findAll({where});
  }

  async atualizarRegistro(id, produto_id, novaInformacao){
  
    await database[this.nomeModelo].update(novaInformacao, {where: {id: Number(id)}});
    const fornecedor = await database[this.nomeModelo].findByPk(id);
   
   if(produto_id){
      await fornecedor.setProdutos(produto_id);
    }else {
      await fornecedor.getProdutos(produto_id);
    }

    return database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Produtos,
           as: "produtos",
          attributes: ['nome','valor','marca','modelo'],
        }
      }
    );
     
  }




}

module.exports = FornecedoresServices;

