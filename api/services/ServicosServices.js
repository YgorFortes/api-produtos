const Services = require('./services.js');
const database = require('../models/index.js');
const associacaoInclude = require ('../funcoesEspecificas/funcaoInclude.js');


class ServicosServices extends Services{
  constructor(){
    super('Servicos');
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
    const {tipo, dataEntrega, pessoaId, nomePessoa} = parametros;
    let  where = {};
    if(tipo ) where.tipo = tipo ;
    if(dataEntrega) where.data_entrega = dataEntrega ;
    if(pessoaId)  where.pessoa_id = pessoaId ;

    if(nomePessoa) {
    
      const include = associacaoInclude(database.Pessoas, "nome", nomePessoa);
      return database[this.nomeModelo].findAll({where, include});
    
    }

    return database[this.nomeModelo].findAll({where});
      
  }

}

module.exports = ServicosServices;