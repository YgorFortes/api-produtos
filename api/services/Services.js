const database = require('../models/index.js');

class Services {
  constructor(nomeModelo){
    this.nomeModelo = nomeModelo;
  }

  async listarTodosOsRegistros(){
    return database[this.nomeModelo].findAll();
  }

  async listarRegistroPorId(id){
    return  database[this.nomeModelo].findOne({where: {id: Number(id)}});
  }
  
  async listarRegistroPorFiltro(parametros){
    return database[this.nomeModelo].findAll({...parametros});
  }
  

  async criarRegistro(informacao, transacao = {}){
    return database[this.nomeModelo].create(informacao , transacao)
  }

  async criarRegistroOuEncontrar(informacao , where = {}){
    return database[this.nomeModelo].findOrCreate( 
      {
        where, 
        defaults: {...informacao}
      }
    );
    
  }

  async atualizarRegistro(id, novaInformacao, transacao = {}){
    return database[this.nomeModelo].update(novaInformacao, {where: {id: Number(id)}});
  }

  async deletarRegistro(id){
    return database[this.nomeModelo].destroy({where: {id: Number(id)}});
  }

  async restaurarRegistro(id){
    return database[this.nomeModelo].restore({where: {id: Number(id)}})
  }


}

module.exports = Services;