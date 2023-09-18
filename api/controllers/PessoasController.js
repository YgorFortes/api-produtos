const  Op  = require('sequelize');
const database = require('../models/index.js');


class PessoaController {
  static async listarTodasPessoas(__, res, next){
    try{
      const resultadoListaPessoas = await database.Pessoas.scope('todas').findAll();
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas não encontrado"});
      } 
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      next(erro);
    }
  }

  static async listarPessoasAtivas(__, res, next){
    try{
      const resultadoListaPessoas = await database.Pessoas.findAll();
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas não encontrado"});
      } 
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      next(erro);
    }
  }

  static async listarPessoasDesativadas(__, res , next){
    try{
      const resultadoListaPessoas = await database.Pessoas.scope('desativadas').findAll();
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas não encontrado"});
      } 
      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      next(erro);
    }
  }

  static async listarPessoaPorFiltro(req, res, next){
  
    const where = filtros(req.query)
    try{
      const resultadoFiltro = await database.Pessoas.findAll({...where})
      if(resultadoFiltro.length <1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      next(erro);
    }
  }

  static async listarPessoaPorId (req, res, next){
    const {id} = req.params;
    try{
      const resultadoPessoaId = await database.Pessoas.findOne(
        {
          where: {id: Number(id)}
        }
      )
        
      if(resultadoPessoaId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
      return res.status(200).json(resultadoPessoaId);
    }catch(erro){
      next(erro);
    }
  }

  static async criarPessoa (req, res, next) {
    const {cpf, ...novaPessoa} = req.body;
    const cpfFormatado = formataCpf(cpf);
    try{
      const [novaPessoaCriada, criado] = await database.Pessoas.findOrCreate(
        {
          where: { cpf : cpfFormatado}, 
          defaults: {...novaPessoa}
        },
      );
      criado?  res.status(201).json(novaPessoaCriada) :   res.status(409).json({mensagem: 'Cpf já cadastrado'});

    }catch(erro){
      next(erro);
    }
  }

  static async atualizarPessoa(req, res, next) {
    const {id} = req.params;
    const noasInfosPessoa = req.body;

    try{
      await database.Pessoas.update(noasInfosPessoa, 
        {
          where: {id: Number(id)}
        }
      )

      const pessoaAtualizada = await database.Pessoas.findOne(
        {
          where: { id: Number(id)}
        }
      )
      if(pessoaAtualizada === null){
        return res.status(500).json({mensagem: "id não encontrado"});
      }
      return res.status(201).json(pessoaAtualizada);
    }catch(erro){
      next(erro);
    }
  }

  static async deletarPessoa(req, res, next) {
    const {id} = req.params;

    try{
      const pessoaDeletada = await database.Pessoas.destroy(
        {
          where: {id: Number(id)}
        }
      )
      if(!pessoaDeletada){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
    return res.status(200).json({mensagem: `Id: ${id} deletado`});
    }catch(erro){
      next(erro);
    }
  }

  static async restaurarPessoa(req, res, next){
    const {id} = req.params;
    try {
      const pessoaRestaurada = await database.Pessoas.restore(
        {
          where:{ id: Number(id)}
        }
      )

      if(!pessoaRestaurada){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }
}

function formataCpf(cpf){
  if(cpf){
    const dado = cpf.replace(/\D/g, '');
    const cpfFormatado = dado.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1-$2-$3-$4'); 
    return cpfFormatado;
  } 
  return cpf = "";
  
}

function filtros(parametros){
  const {nome,cpf} = parametros;
  const where = {};
  if (nome)   where.nome  = nome;
  if (cpf)  where.cpf  =  formataCpf(cpf);

  return {where} ;
}

module.exports = PessoaController;