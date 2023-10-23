const {FornecedoresServices} = require('../services/index.js');
const fornecedoresServices = new FornecedoresServices;
const {verificaCamposVazios, verificaId} = require('../helpers/helpers.js');
const formataTelefone = require('../funcoesEspecificas/formatarTelefone.js');
class FornecedorController{

  static async listarFornecedores(__, res, next) {
    try {
      
      //Busca fornecedores
      const resultadoListaFornecedores = await fornecedoresServices.listarTodosOsRegistros();
      
      //Verifica se fornecedor existe
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

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //Busca fornecedor por id
      const resultadoFornecedorPorId = await fornecedoresServices.listarRegistroPorId(id);

      //Verifica se fornecedor existe
      if(!resultadoFornecedorPorId){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
       
      return res.status(200).json(resultadoFornecedorPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarFornecedorPorFiltro(req, res, next){
    try {

      //Busca fornecedores por filtro
      const resultadoFiltro = await fornecedoresServices.listarRegistroPorFiltro(req.query)
      
      //Verifica se fornecedores existe
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }
  

  static async criarFornecedor(req, res, next){

    const {nome, endereco, telefone,cnpj, produto_id} = req.body;
    console.log(formataTelefone(telefone))
    //Cria objeto fornecedor
    const fornecedor  = {
      nome: nome,
      endereco: endereco,
      telefone: formataTelefone(telefone),
      cnpj: cnpj
    }

    //Criando where para procurar se existe fornecedor
    const where = {
      cnpj : cnpj,
      telefone: telefone,
    }
    
    try {

      //Verificando os campos vazios
      const campos = ['nome', 'endereco', 'telefone', 'cnpj', 'produto_id'];
      const erroCampos = verificaCamposVazios(req.body, campos);
      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }

      //Busca e cria fornecedor
      const [novoFornecedor, criado] = await fornecedoresServices.criarRegistroOuEncontrar(fornecedor, where);
      
      //Verifica se fornecedor foi criado
      if(!criado){
        return res.status(409).json({mensagem: 'Cnpj já cadastrado'});
      }

      //Associa fornecedor no produto
      await novoFornecedor.setProdutos(produto_id);

      return res.status(200).json(novoFornecedor);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarFornecedor (req, res, next){
    const {id} = req.params;
    const {produto_id, ...infoFornecedor} = req.body;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }
      
      //buscando se fornecedor 
      const fornecedorExiste = await fornecedoresServices.listarRegistroPorId(id);

       //Verificando se fornecedor existe
      if(!fornecedorExiste){
        return res.status(404).json({mensagem: 'Fornecedor não existe'});
      }

      //Atualiza fornecedor
      const resultado = await fornecedoresServices.atualizarRegistro(id, produto_id, infoFornecedor);

      //Verifica se fornecedor foi atualizado
      if(!resultado){
        return res.status(500).json({mensagem: "Fornecedor não atualizado"});
      }

      //Busca fornecedor atualizado
      const fornecedorAtualizado = await fornecedoresServices.listarRegistroPorId(id);
    

      return res.status(200).json(fornecedorAtualizado);
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarFornecedor(req, res, next){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }

      //buscando se fornecedor 
      const fornecedorExiste = await fornecedoresServices.listarRegistroPorId(id);

       //Verificando se fornecedor existe
      if(!fornecedorExiste){
        return res.status(404).json({mensagem: 'Fornecedor não existe'});
      }

      //Deletando fornecedor
      const fornecedorDeletado = await fornecedoresServices.deletarRegistro(id);

      //Verifica se fornecedor foi deletado
      if(!fornecedorDeletado){
        return res.status(500).json({mensagem: "Id não deletado"});
      }
    
      return res.status(200).json({mensagem: `Id ${id} deletado com sucesso`});
    } catch (erro) {
      next(erro);
    }
  }

  static async restaurarFornecedor(req, res, next){
    const {id} = req.params;
    try {

      //Verifica se id é um número
      const {valido, mensagem} = verificaId(id);
      if(!valido){
        return res.status(400).send({mensagem});
      }
      

      //Restaurando fornecedor
      const fornecedorRestaurado = await fornecedoresServices.restaurarRegistro(id);

      //Verifica se fornecedor foi restaurado
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