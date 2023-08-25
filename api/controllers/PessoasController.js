const { where } = require('sequelize');
const database = require('../models/index.js');

class PessoaController {
  static async listarPessoas(req, res){
    try{
      const resultadoListaPessoas = await database.Pessoas.findAll();
      return res.status(200).json(resultadoListaPessoas)
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
    const novaPessoa = req.body;

    try{
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      res.status(201).json(novaPessoaCriada)
    }catch(erro){
      console.log(erro)
    }
  }
}

module.exports = PessoaController;