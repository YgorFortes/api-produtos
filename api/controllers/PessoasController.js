const {PessoasServices} =  require("../services/index.js");
const pessoasServices = new PessoasServices;
const {verificaCamposVazios, resgatarIdLogin} = require('../helpers/helpers.js');
const formataCpf = require('../funcoesEspecificas/formatarCpf.js');



class PessoaController {
  static async listarTodasPessoas(__, res, next){
    try{
      //Busca todas as pessoas
      const resultadoListaPessoas = await pessoasServices.listarTodos();

      //Verifica se existe pessoas cadastradas
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas não encontrado"});
      } 


      return res.status(200).json(resultadoListaPessoas);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async listarPessoasAtivas(__, res, next){
    try{
      
      //Busca todas as pessoas ativas
      const resultadoListaPessoas = await pessoasServices.listarTodosOsRegistros();

      //Verifica se existe pessoas ativas cadastradas
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas ativas não encontradas"});
      } 


      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async listarPessoasDesativadas(__, res , next){
    try{
      
      //Busca todas as pessoas desativadas
      const resultadoListaPessoas = await pessoasServices.listarRegistroDesativados();
      
      //Verifica se existe pessoas desativadas cadastradas
      if(resultadoListaPessoas.length < 1){
        return res.status(500).json({mensagem: "Pessoas desativadas não encontradas"});
      } 


      return res.status(200).json(resultadoListaPessoas)
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async listarPessoaPorFiltro(req, res, next){
    try{

      //Busca pessoas pelo filtro, conforme a tabela no banco ex = data_nascimento = 2007-07-07
      const resultadoFiltro = await  pessoasServices.listarRegistroPorFiltro(req.query);
      
      //Verifica se existe pessoas cadastradas conforme o filtro 
      if(resultadoFiltro.length <1){
        return res.status(404).json({mensagem: "Resultado não encontrado"});
      }
      
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async listarPessoaPorId (req, res, next){
    const {id} = req.params;
    try{

      //Busca pessoa pelo id na url
      const resultadoPessoaId = await pessoasServices.listarRegistroPorId(id);
    
      //Verifica se existe pessoas cadastradas conforme o id
      if(!resultadoPessoaId ){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }


      return res.status(200).json(resultadoPessoaId);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async detalharPessoa(req, res){
    try{

      //Resgata o id de login do token 
      const idLogin = await resgatarIdLogin(req);

      //Busca detalhado o perfil da pessoa conforme o id de Login
      const resultadoPessoaId = await pessoasServices.detalharPessoa(idLogin);
      
      //Verifica se a pessoa existe conforme o id de login
      if(!resultadoPessoaId ){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }


      return res.status(200).json(resultadoPessoaId);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async criarPessoa (req, res, next) {
    const {nome, data_nascimento, cpf, endereco, funcao, ativo} = req.body;

    //Formata cpf
    const cpfFormatado = formataCpf(cpf);

    //Cria um objeto where que recebe cpf formatado
    const where = {
      cpf: cpfFormatado
    }

    try{

      //Verificando os campos vazios
      const erroCampos = verificaCamposVazios(req.body, 'nome', 'data_nascimento', 'cpf', 'endereco','funcao', 'ativo');
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Resgata o id de login do token 
      const idLogin = await resgatarIdLogin(req);

      //Cria um objeto pessoa com atributos
      const objetoPessoa =  criarObjetoPessoa(nome, data_nascimento ,cpf, endereco, funcao, ativo, idLogin);

      //Cria pessoa se não existe cpf cadastrado
      const [novaPessoaCriada, criado] = await pessoasServices.criarRegistroOuEncontrar(objetoPessoa,  where);

      //Verificando se já tinha cpf cadastrado
      if(!criado){
        return res.status(409).json({mensagem: 'Cpf já cadastrado'});
      }

      return res.status(201).json(novaPessoaCriada) 
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async atualizarPessoa(req, res, next) {
    const {id} = req.params;
    const novasInfosPessoa = req.body;
    console.log(novasInfosPessoa)
    try{

      //Busca pessoa com id da url 
      const pessoa = await pessoasServices.listarRegistroPorId(id)
    
      //Verifica se pessoa com id existe
      if(!pessoa){
        return res.status(404).send({mensagem: 'Pessoa não encontrada'});
      }

      //Impedindo de atualizar o id de login
      if(novasInfosPessoa.hasOwnProperty('login_id')){
        return res.status(409).json({mensagem: 'Não se pode atualizar login_id'});
      }

      //Atualiza pessoa conforme id e tabela no banco ex data_nascimento = 2007-07-07
      const [resultado] = await pessoasServices.atualizarRegistro(id, novasInfosPessoa);
      
  
      //Verifica se pessoa foi cadastrada com sucesso
      if(!resultado){
        return res.status(409).json({mensagem: 'Pessoa não atualizada'});
      }
  
      //Busca pessoa atualizada pelo seu id
      const pessoaAtualizada = await pessoasServices.listarRegistroPorId(id);

      //Verifica se pessoa existe 
      if(!pessoaAtualizada ){
        return res.status(500).json({mensagem: "id não encontrado"});
      }


      return res.status(201).json(pessoaAtualizada);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async deletarPessoa(req, res, next) {
    const {id} = req.params;

    try{

      //Resgata id
      const idLogin= await resgatarIdLogin(req);
    

      //Busca pessoa conforme o id
      const pessoa = await pessoasServices.listarRegistroPorId(id);
      
      //Verifica se pessoa existe 
      if(!pessoa){
        return res.status(404).send({mensagem: 'Pessoa não encontrada'})
      }

      //Verifica se o id de login corresponde ao da pessoa que será deletada
      const loginCorresponde = verificarIdLoginCorresponde(idLogin, pessoa);
      if(loginCorresponde){
        return res.status(403).send({mensagem: 'Não pode excluir a si mesmo.'});
      }

      //Deleta pessoa conforme o id
      const pessoaDeletada = await pessoasServices.deletarRegistro(id);
  
      //Verifica se pessoa foi deletada com sucesso
      if(!pessoaDeletada){
        return res.status(500).json({mensagem: "Id não deletado"});
      }


      return res.status(200).json({mensagem: `Id: ${id} deletado`});
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

  static async restaurarPessoa(req, res, next){
    const {id} = req.params;
    try {
      
      //Restaura pessoa pelo id
      const pessoaRestaurada = await pessoasServices.restaurarRegistro(id);

      //Verifica se a pessoa foi restaurada
      if(!pessoaRestaurada){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
      console.log(erro);
    }

  }

  static async atualizarPessoaLogada(req, res, next){

    const novasInfosPessoa = req.body;

    try{

      
      // Resgata id pelo seu token
      const idLogin= await resgatarIdLogin(req);


      //Busca pessoa com id de login 
      const pessoa = await pessoasServices.detalharPessoa(idLogin);

      //Criando uma const que recebe o id de pessoa
      const id = pessoa.id;

      //Verifica se pessoa com id existe
      if(!pessoa){
        return res.status(404).send({mensagem: 'Pessoa não encontrada'});
      }

      //Impedindo de atualizar o id de login
      if(novasInfosPessoa.hasOwnProperty('login_id')){
        return res.status(409).json({mensagem: 'Não se pode atualizar login_id'});
      }

      //Atualiza pessoa conforme id e tabela no banco ex data_nascimento = 2007-07-07
      const [resultado] = await pessoasServices.atualizarRegistro(id, novasInfosPessoa);

      //Verifica se pessoa foi cadastrada com sucesso
      if(!resultado){
        return res.status(409).json({mensagem: 'Pessoa não cadastrada'});
      }
  
      //Busca pessoa atualizada pelo seu id
      const pessoaAtualizada = await pessoasServices.listarRegistroPorId(id);

      //Verifica se pessoa existe 
      if(!pessoaAtualizada ){
        return res.status(500).json({mensagem: "id não encontrado"});
      }


      return res.status(201).json(pessoaAtualizada);
    }catch(erro){
      next(erro);
      console.log(erro);
    }
  }

}

function verificarIdLoginCorresponde(idLogin, pessoa){
  if(idLogin ===  pessoa.login_id ){
    return true;
  }
  return false
}

function criarObjetoPessoa(nome, data_nascimento, cpf, endereco, funcao, ativo, idLogin){
  const cpfFormatado = formataCpf(cpf);
  const objetoPessoa = {
    nome: nome,
    data_nascimento: data_nascimento,
    cpf: cpfFormatado,
    endereco: endereco,
    funcao: funcao,
    ativo: ativo,
    login_id: idLogin
  }
  return objetoPessoa
}







module.exports = PessoaController;