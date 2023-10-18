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
        return res.status(500).json({mensagem: "Serviços não encontrado"});
      }

      return res.status(200).json(resultadoListaServicos)
    } catch (erro) {
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
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(resultadoServicoPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarServicosPorFiltro(req, res, next){
    try {

      //Busca serviço pelo filtro ex data_entrega:2023-10-17
      const resultadoPorFiltro = await servicosServices.listarRegistroPorFiltro(req.query);
      
      //Verifica se o serviço existe
      if(resultadoPorFiltro.length <1 ){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      res.status(200).json(resultadoPorFiltro)
    } catch (erro) {
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
      
    }
   

  }

  static async criarServico (req, res, next){
    const {tipo, data_entrega, preco} = req.body;
    try {

      const idLogin = await resgatarIdLogin(req);
      //Verificando os campos vazios
      const erroCampos = verificaCamposVazios(req.body, 'tipo', 'data_entrega', 'preco');
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos})
      }

      //Cria um serviço conforme o pessoa de idLogin
      const novoServico = await servicosServices.criarRegistro(idLogin, {tipo, data_entrega, preco});

      return res.status(201).json(novoServico);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarServico(req, res, next){
    const {id} = req.params;
    const novaInforServico = req.body;
    try {

      //Verifica se id é um número
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }
      
      //Buscando serviço pelo id
      const servico = await servicosServices.listarRegistroPorId(id);

      //Veirificando se servico existe
      if(!servico ){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      //Impede de tentar atualizar pessoa_id
      if(novaInforServico.hasOwnProperty('pessoa_id')){
        return res.status(409).json({mensagem: 'Não pode atualizar pessoa_id'});
      }

      //Atualiza servico
      const resultado= await servicosServices.atualizarRegistro(id, novaInforServico);
 
      //Verifica se servico foi cadastrada com sucesso
      if(!resultado){
        return res.status(409).json({mensagem: 'Pessoa não atualizada'});
      }

      //Buscando novo serviço pelo id
      const novoServicoAtualizado = await servicosServices.listarRegistroPorId(id);
    
      //Veirificando se novo servico existe
      if(!novoServicoAtualizado ){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
      
      return res.status(200).json(novoServicoAtualizado);
    } catch (erro) {
      next(erro);;
    }
  }

  static async deletarServico(req, res, next){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }

      //Buscando serviço pelo id
      const servico = await servicosServices.listarRegistroPorId(id);

      //Veirificando se servico existe
      if(!servico ){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      //Deleta o servico
      const servicoDeletado = await servicosServices.deletarRegistro(id)
      
      //Verrifica se deletou
      if(!servicoDeletado ){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
    

      return res.status(200).json({mensagem: `Id: ${id} Deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarServico(req, res, next){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      if(isNaN(id)){
        return res.status(400).send({mensagem: 'Id inválido. Digite um número.'})
      }

      //Restaura o serviço
      const servicoRestaurado = await servicosServices.restaurarRegistro(id)

      //Verifica se restaurou serviço
      if(!servicoRestaurado ){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }
  }


}





module.exports = ServicosController;