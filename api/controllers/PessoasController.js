const { where } = require('sequelize');
const database = require('../models/index.js');

class PessoaController {
  static async listarTodasPessoas(__, res){
    try{
      const resultadoListaPessoas = await database.Pessoas.scope('todas').findAll();
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async listarPessoasAtivas(__, res){
    try{
      const resultadoListaPessoas = await database.Pessoas.findAll();
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async listarPessoasDesativadas(__, res){
    try{
      const resultadoListaPessoas = await database.Pessoas.scope('desativadas').findAll();
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async listarPessoaPorFiltro(req, res){
    const {nome,cpf} = req.query;
    const where = {};
    nome  ? where.nome = nome: null
    cpf  ? where.cpf = cpf: null
    
    try{
      const resultadoFiltro = await database.Pessoas.findAll({where})
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async listarPessoaPorId (req, res){
    const {id} = req.params;
    try{
      const resultadoPessoaId = await database.Pessoas.findOne(
        {
          where: 
          {
            id: Number(id)
          }
        })
        return res.status(200).json(resultadoPessoaId);
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async criarPessoa (req, res) {
    const {cpf, ...novaPessoa} = req.body;
    try{
      const [novaPessoaCriada, criado] = await database.Pessoas.findOrCreate(
        {
          where: { cpf : cpf}, 
          defaults: {...novaPessoa}
        },
      );

      criado?  res.status(201).json(novaPessoaCriada) :   res.status(409).json({mensagem: 'Cpf já cadastrado'});

    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const {id} = req.params;
    const noasInfosPessoa = req.body;

    try{
      await database.Pessoas.update(noasInfosPessoa, 
        {
          where: {
            id: Number(id)
          }
        }
      )

      const pessoaAtualizada = await database.Pessoas.findOne(
        {
          where: 
          {
            id: Number(id)
          }
        }
      )
      return res.status(201).json(pessoaAtualizada);
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async deletarPessoa(req, res) {
    const {id} = req.params;

    try{
      await database.Pessoas.destroy(
        {
        where: 
        {
          id: Number(id)
        }
      }
    )
    return res.status(200).json({mensagem: `Id: ${id} deletado`});
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }

  static async restaurarPessoa(req, res){
    const {id} = req.params;
    try {
      await database.Pessoas.restore(
        {
          where:{ id: Number(id)}
        })
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }

  }
}

module.exports = PessoaController;