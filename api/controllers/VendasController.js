const { status } = require('init');
const { verificaCamposVazios, resgatarIdLogin } = require('../helpers/helpers.js');
const {VendasServices, IntemVendasServices} = require('../services/index.js');
const vendasServices = new VendasServices;
const itemVendasServices = new IntemVendasServices;


class VendasController{

  static async listarVendas(__, res, next){
    try {
      //Busca lista de todos os registros de vendas
      const listarResultadoVendas = await vendasServices.listarTodosOsRegistros();

      //Verica se a lista de vendas estar vazia
      if(listarResultadoVendas.length <1){
        return res.status(404).json({mensagem: "Vendas não encontrado"});
      }

      return res.status(200).json(listarResultadoVendas);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarVendaPorId(req, res, next) {
    const {id} = req.params;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca a venda pelo seu id
      const listarVendaPorId = await vendasServices.listarRegistroPorId(id);

      //Verifica se a venda existe
      if(!listarVendaPorId ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }
    
      return res.status(200).json(listarVendaPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async  listarVendasPessoaLogado(req, res){
    try {
      //Resgata o id de login
      const idLogin = await resgatarIdLogin(req);

      //Busca vendas da pessoa logada 
      const vendasPessoaLogada = await vendasServices.listarVendasLogado(idLogin);

      //Verifica se vendas existe
      if(vendasPessoaLogada.length <1){
        return res.status(404).send({mensagem: 'Nenhuma venda associado a esta pessoa.'});
      }

      
      return res.status(200).send(vendasPessoaLogada)
    } catch (erro) {
      next(erro);
    }
  }

  static async listarVendaPorFiltro(req, res, next){
    try{
      
      //Busca a venda por filtro de acordo com a tabela ex data_entrega = 2023-10-07
      const resultadoFiltro = await vendasServices.listarRegistroPorFiltro(req.query);

      //Verifica se o existe o resultado do filtro
      if(resultadoFiltro.length <1){
        return res.status(404).json({mensagem: "Resultado não encontrado"});
      }
      return res.status(200).json(resultadoFiltro);
    }catch(erro){
      next(erro);
    }
  }

  static async criarItemVenda(req, res, next) {
    const {idProduto, quantidadeProdutoComprado} = req.body;
    const {idVenda} = req.params;

    try {

      //Resgata o id de login
      const idLogin = await resgatarIdLogin(req);

      //Verifica campos em branco
      const campos = ['data_entrega','data_pagamento' ,'data_venda', 'idProduto', 'quantidadeProdutoComprado'];
      const erroCampos = verificaCamposVazios(req.body,  campos );
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }

      const parametros ={
        idProduto, quantidadeProdutoComprado, idLogin ,idVenda
      }

      //Registra a compra 
      const novoItemVendaCriado = await itemVendasServices.criarRegistro(parametros); 
      
      //Verifica se a compra foi realizada com sucesso
      if(!novoItemVendaCriado){
        return res.status(400).send({mensagem: 'Não foi possível concluir a venda.'});
      }
      
      return res.status(200).json(novoItemVendaCriado);
    } catch (erro) {
      next(erro);
    }
  }

  static async criarVenda(req, res, next){
    const {data_pagamento, data_entrega, data_venda, pessoa_id} = req.body;

    try {
      //Verifica campos em branco
      const campos = ['data_pagamento','data_entrega' ,'data_venda', 'pessoa_id'];
      const erroCampos = verificaCamposVazios(req.body, campos);
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }

      const venda = {
        data_pagamento, data_entrega, data_venda, pessoa_id
      }

      const vendaCriada = await vendasServices.criarRegistro(venda);

      if(!vendaCriada){
        return res.status(400).send({mensagem: 'Venda não criada'});
      }

      return res.status(200).send(vendaCriada)
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarVenda(req, res, next ){
    const {id} = req.params;
    const novaInfoVenda = req.body;

    try {
   
      //Atualiza
      const [resultado] = await vendasServices.atualizarRegistro(id, novaInfoVenda);

      //Verifica se venda foi atualizada com sucesso
      if(!resultado){
        return res.status(409).json({mensagem: "Venda não atualizada"});
      }

      //busca venda atualizada
      const novaVendaAtualizada = await vendasServices.listarRegistroPorId(id);

      //Verifica se venda existe
      if(!novaVendaAtualizada ){
        return res.status(404).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(novaVendaAtualizada)
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarVenda(req, res, next ){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca venda por id
      const venda = await vendasServices.listarRegistroPorId(id);
      //Verifica se venda existe 
      if(!venda){
        return res.status(404).send({mensagem: 'Venda não encontrada'});
      }

      //Deletando venda
      const vendaDeletada= await vendasServices.deletarRegistro(id);

      //Verificando se foi deletado
      if(!vendaDeletada){
        return res.status(409).json({mensagem: "Id não deletado"});
      }

      return res.status(200).json({mensage: `Id: ${id} deletado`}) ;
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarVenda(req, res, next){
    const {id} = req.params;
    try {

      //Restaura venda por id
      const vendaRestaurada = await vendasServices.restaurarRegistro(id);

      //Verifica se foi restaurado com sucesso
      if(!vendaRestaurada){
        return res.status(409).json({mensagem: "Id não restaurado"});
      }
    
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

  static async gerarReciboCompra(req, res, next){
    const {id} = req.params;
    try {
      //Resgata id de pessoa logada
      const idLogin = await resgatarIdLogin(req);

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca o recibo da venda do funcionario logado
      const recibo = await vendasServices.gerarRebico(id, idLogin);
      
      //Verifica se o recibo existe
      if(!recibo){
        return res.status(404).send({mensagem: 'Venda não encontrada ou não associada ao funcionario'});
      }

      return res.status(200).send(recibo);
    } catch (erro) {
      next(erro);
    }
  }
}


module.exports = VendasController;


 
