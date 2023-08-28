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
      return res.status(201).json(novaPessoaCriada)
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
    return res.status(201).json({mensagem: `Id: ${id} deletado`});
    }catch(erro){
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = PessoaController;