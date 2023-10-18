const Services = require('./services.js');
const database = require('../models/index.js');
const formataCpf = require('../funcoesEspecificas/formatarCpf.js')
class PessoasServices extends Services{
  constructor(){
    super('Pessoas');
  }
  async listarRegistroPorId(id){
    return  database[this.nomeModelo].scope('todas').findOne({where: {id: Number(id)}});
  }

  async listarTodos(){
    return database[this.nomeModelo].scope('todas').findAll();
  }

  async listarRegistroDesativados(){
    return database[this.nomeModelo].scope('desativados').findAll();
  }

  async listarRegistroPorFiltro(parametros){
    const {nome,cpf} = parametros;
    const where = {};
    if (nome)   where.nome  = nome;
    if (cpf)  where.cpf  =  formataCpf(cpf);
    return database[this.nomeModelo].findAll({where});
      
  }

  async atualizarRegistro(id, novaInformacao, transacao = {}){
    return database[this.nomeModelo].scope('todas').update(novaInformacao, {where: {id: Number(id)}});
  }

  async detalharPessoa(idLogin){
    return database[this.nomeModelo].findOne({
      include: [{
        model: database.Login,
        where: { id: idLogin},
        attributes:  ['id','email'],
      }]
    })
  }
  
}
module.exports = PessoasServices;