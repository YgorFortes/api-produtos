const Services = require('./services.js');
const database = require('../models/index.js');
const formataCpf = require('../funcoesEspecificas/formatarCpf.js')
class PessoasServices extends Services{
  constructor(){
    super('Pessoas');
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
  
}
module.exports = PessoasServices;