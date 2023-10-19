const {ServicosServices} =  require("../services/index.js");
const servicosServices = new ServicosServices;
const {verificaCamposVazios, resgatarIdLogin} = require('../helpers/helpers.js');
class ServicosController {
  static async listarServicos(__,res, next){
    try {

      //Busca todos os registros de serviços
      const resultadoListaServicos = await servicosServices.listarTodosOsRegistros();

      //Verifica se serviços estão vazios
      if(resultadoListaServicos.length <1 ){
        return res.status(404).json({mensagem: "Serviços não encontrado"});
      }

      return res.status(200).json(resultadoListaServicos)
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async listaServicosPorId(req,res, next){
    const {id} = req.params;

    try {

      //Verifica se id é um número
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }
      
      //Busca o serviço com numero id
      const resultadoServicoPorId = await servicosServices.listarRegistroPorId(id);

      //Verifica se serviço existe
      if(!resultadoServicoPorId){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoServicoPorId);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async listarServicosPorFiltro(req, res, next){
    try {

      //Busca serviço pelo filtro ex data_entrega:2023-10-17
      const resultadoPorFiltro = await servicosServices.listarRegistroPorFiltro(req.query);
      
      //Verifica se o serviço existe
      if(resultadoPorFiltro.length <1 ){
        return res.status(404).json({mensagem: "Resultado não encontrado"});
      }

      res.status(200).json(resultadoPorFiltro)
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async listarServicoDaPessoaLogado(req, res){
    try {
      //Resgatando id de login pelo token
      const idLogin = await resgatarIdLogin(req);

      //Busca servico pelo idLogin do token
      const servicosPessoaLogada = await servicosServices.listarRegistroDaPessoaLogada(idLogin);

      //Verifica se existe serviço pela pessoa logada
      if(servicosPessoaLogada.length <1 ){
        return res.status(404).send({mensagem: 'Nenhum serviço associado a esta pessoa.'})
      }
      return res.status(200).send(servicosPessoaLogada) ;
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
   

  }

  static async criarServico (req, res, next){
    const {tipo, data_entrega, preco} = req.body;
    try {

      //Resgatando id de login pelo token
      const idLogin = await resgatarIdLogin(req);

      //Verificando os campos vazios
      const erroCampos = verificaCamposVazios(req.body, 'tipo', 'data_entrega', 'preco');
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }

      //Cria um serviço conforme o pessoa de idLogin
      const novoServico = await servicosServices.criarRegistro(idLogin, {tipo, data_entrega, preco});

      return res.status(201).json(novoServico);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async atualizarServico(req, res, next){
    const {id} = req.params;
    const novaInforServico = req.body;
    try {

      //checa se id é um númerico
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }
      
      //Busca serviço pelo id
      const servico = await servicosServices.listarRegistroPorId(id);

      //Veirifica se servico existe
      if(!servico ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }

      // Impede a atualização do campo pessoa_id
      if(novaInforServico.hasOwnProperty('pessoa_id')){
        return res.status(409).json({mensagem: 'Não pode atualizar pessoa_id'});
      }

      //Atualiza servico
      const resultado= await servicosServices.atualizarRegistro(id, novaInforServico);
 
      // Verifica se a atualização foi bem sucedida
      if(!resultado){
        return res.status(409).json({mensagem: 'Serviço não atualizado'});
      }

      //Busca serviço atualizado pelo id
      const novoServicoAtualizado = await servicosServices.listarRegistroPorId(id);
    
      //Veirificando o serviço atualizado existe
      if(!novoServicoAtualizado ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }
      
      return res.status(200).json(novoServicoAtualizado);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async deletarServico(req, res, next){
    const {id} = req.params;
    try {

      //checa se id é um númerico
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }

      //Busca serviço pelo id
      const servico = await servicosServices.listarRegistroPorId(id);

      //Veirifica se o servico existe
      if(!servico ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }

      //Deleta o servico
      const servicoDeletado = await servicosServices.deletarRegistro(id)
      
      //Verrifica se foi bem sucedido
      if(!servicoDeletado ){
        return res.status(409).json({mensagem: "Id não deletado"});
      }
    

      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async restaurarServico(req, res, next){
    const {id} = req.params;
    try {

      //checa se id é um númericoo
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }

      //Restaura o serviço pelo id
      const servicoRestaurado = await servicosServices.restaurarRegistro(id)

      //Verifica se a restauração foi bem sucedida
      if(!servicoRestaurado ){
        return res.status(409).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }

  static async atualizaServicosPessoaLogado(req, res){
    const {id} = req.params;
    const novaInforServico = req.body;

    try {

      //checa se id é um númericoo
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }

      //Resgata id da tabela login 
      const idLogin = await resgatarIdLogin(req);

      //Resgata o idServico se o id params estiver associado a pessoa logada
      const idServico = await verificaServicoAssociado(idLogin, id ,res);
      
      if(!idServico){
       return res.status(404).send({mensagem: `O id ${id} não estar associado a essa conta`});
      }

      //atualiza servico
      const [resultado] = await servicosServices.atualizarRegistro(idServico, novaInforServico);

      //Verifica se a atualização foi bem sucedida
      if(!resultado){
        return res.status(409).json({mensagem: 'Serviço não atualizado'});
      }

      //Busca serviço atualizado pelo id
      const novoServicoAtualizado = await servicosServices.listarRegistroPorId(idServico);
    
      //Veirificando o serviço atualizado existe
      if(!novoServicoAtualizado ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }


      return res.status(200).json(novoServicoAtualizado);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }

  }

}

async function verificaServicoAssociado(idLogin, id, res){
  const servicosPessoaLogada = await servicosServices.listarRegistroDaPessoaLogada(idLogin) ;

  if(servicosPessoaLogada.length <1 ){
    return res.status(404).send({mensagem: 'Nenhum serviço associada a essa conta '});
  }

  for (let servicoPessoaLogada of servicosPessoaLogada){
    if(servicoPessoaLogada.id === Number(id)){
      return servicoPessoaLogada.id ;
    }
  }

}





module.exports = ServicosController;