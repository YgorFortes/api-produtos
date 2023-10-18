const Services = require('./services.js');
const database = require('../models/index.js');
const associacaoInclude = require ('../funcoesEspecificas/funcaoInclude.js');
const PessoasServices = require('./PessoasServices.js');

class ServicosServices extends Services{
  constructor(){
    super('Servicos');
    this.pessoas = new Services('Pessoas');
  }

  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll({ include: {
      model: database.Pessoas,
      attributes: ['nome','cpf'],
    }});
  }

  async listarRegistroPorId(id){
    return  database[this.nomeModelo].findOne(
      {
        where: {id: Number(id)},
        include: {
          model: database.Pessoas,
          attributes: ['nome','cpf'],
        }
      }
    );
  }

  async listarRegistroDaPessoaLogada(idLogin){
    return  database.Servicos.findAll({
      include: [{
        model: database.Pessoas,
        where: { login_id: idLogin},
        attributes:  ['id','nome', 'cpf','funcao'],
      }]
    });
  }

  async listarRegistroPorFiltro(parametros){
    const {tipo, data_entrega, pessoaId, nomePessoa, preco} = parametros;
    let  where = {};
    
    if(tipo ) where.tipo = tipo ;
    if(data_entrega) where.data_entrega = data_entrega ;

    if(pessoaId)  where.pessoa_id = pessoaId ;
    if(preco) where.preco = preco;

    if(nomePessoa) {
      const include = associacaoInclude(database.Pessoas, "nome", nomePessoa);
      return database[this.nomeModelo].findAll({where, include});
    }

    return database[this.nomeModelo].findAll({where});
      
  }



  async criarRegistro(idLogin, informacao){
    const pessoa = await this.pessoas.listaRegistroPorParametro('login_id', idLogin);
    const idPessoa = pessoa.id || null;

    return database[this.nomeModelo].create({pessoa_id: idPessoa, ...informacao})
  }

}

module.exports = ServicosServices;