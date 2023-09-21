const database = require('../models/index.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js');
const {FornecedoresServices} = require('../services/index.js');
const fornecedoresServices = new FornecedoresServices;
class FornecedorController{

  static async listarFornecedores(__, res, next) {
    try {
      const resultadoListaFornecedores = await fornecedoresServices.listarTodosOsRegistros();

     if(resultadoListaFornecedores.length < 1){
        return res.status(500).json({mensagem: "Fornecedores não encontrado"});
      } 

      return res.status(200).json(resultadoListaFornecedores);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarFonecedorPorId(req, res, next){
    const {id} = req.params;
    try {
      const resultadoFornecedorPorId = await fornecedoresServices.listarRegistroPorId(id);

      if(resultadoFornecedorPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
       
      return res.status(200).json(resultadoFornecedorPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarFornecedorPorFiltro(req, res, next){
    try {
      const resultadoFiltro = await fornecedoresServices.listarRegistroPorFiltro(req.query)
  
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }
  

  static async criarFornecedor(req, res, next){

    const {cnpj, telefone, produtos, ...infoFornecedor} = req.body;
    const where = {
      cnpj : cnpj,
      telefone: telefone,
    }
    
    try {
      const [novoFornecedor, criado] = await fornecedoresServices.criarRegistroOuEncontrar(infoFornecedor, where);
      
      if(criado){
        await novoFornecedor.setProdutos(produtos);
        return res.status(200).json(novoFornecedor);
      }else{
        return res.status(409).json({mensagem: 'Cnpj já cadastrado'});
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarFornecedor (req, res, next){
    const {id} = req.params;
    const {produtos, ...infoFornecedor} = req.body;
    try {
      const fornecedorAtualizado = await fornecedoresServices.atualizarRegistro(id, produtos, infoFornecedor);

      if(fornecedorAtualizado == null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }

      return res.status(200).json(fornecedorAtualizado);
      
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarFornecedor(req, res, next){
    const {id} = req.params;
    try {
      const fornecedorDeletado = await fornecedoresServices.deletarRegistro(id);


      if(!fornecedorDeletado){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
    
      res.status(200).json({mensagem: `Id ${id} deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarFornecedor(req, res, next){
    const {id} = req.params;
    try {
      const fornecedorRestaurado = await fornecedoresServices.restaurarRegistro(id);

      if(!fornecedorRestaurado){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

}

module.exports = FornecedorController;