const database = require('../models/index.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')
class FornecedorController{

  static async listarFornecedores(__, res, next) {
    try {
      const resultadoListaFornecedores = await database.Fornecedores.findAll(
        {
          include: {
            model: database.Produtos,
            as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          },
        }
      );

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
      const resultadoFornecedorPorId = await database.Fornecedores.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Produtos,
             as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          }
        }
      );

      if(resultadoFornecedorPorId === null){
        return res.status(500).json({mensagem: "Id não encontrado"});
      }
       
      return res.status(200).json(resultadoFornecedorPorId);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarFornecedorPorFiltro(req, res, next){
    const where = filtros(req.query);
    try {
      const resultadoFiltro = await database.Fornecedores.findAll({...where});
  
      if(resultadoFiltro.length < 1){
        return res.status(500).json({mensagem: "Resultado não encontrado"});
      }

      return res.status(200).json(resultadoFiltro);
    } catch (erro) {
      next(erro);
    }
  }

  static async criarFornecedor(req, res, next){
    const {cnpj,telefone,produtos, ...informacaoNovoFornecedor} = req.body;
    const cnpjFormatado = formatarCnpj(cnpj);
    const telefoneFormatado = formataTelefone(telefone);
    try {
      const [novoFornecedor, criado] = await database.Fornecedores.findOrCreate(
        {
          where: { cnpj : cnpjFormatado, telefone: telefoneFormatado}, 
          defaults: {...informacaoNovoFornecedor}
        }
      );
      
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
       await database.Fornecedores.update(infoFornecedor,
        {
          where: {id: Number(id)}
        }
      );

      const fornecedorAtualizadoEncontrado = await database.Fornecedores.findOne(
        {
          where: {id: Number(id)},
          include: {
            model: database.Produtos,
             as: "produtos",
            attributes: ['nome','valor','marca','modelo'],
          }
        },
      );

      if(produtos){
        fornecedorAtualizadoEncontrado.setProdutos(produtos);
      }else {
        fornecedorAtualizadoEncontrado.getProdutos(produtos);
      }
      res.status(200).json(fornecedorAtualizadoEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarFornecedor(req, res, next){
    const {id} = req.params;
    try {
      const fornecedorDeletado = await database.Fornecedores.destroy( 
        {
          where: {id: Number(id)}
        }
      );

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
      const fornecedorRestaurado = await database.Fornecedores.restore(
        {
          where:{ id: Number(id)}
        }
      )

      if(!fornecedorRestaurado){
        return res.status(500).json({mensagem: "Id não restaurado"});
      }

      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      next(erro);
    }

  }

}

function formatarCnpj(cnpj){
  if(cnpj){
    const cnpjSemCaracter = cnpj.replace(/\D/g, '');
    const cnpjFormatado = cnpjSemCaracter.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    return cnpjFormatado
  }
  return cnpj = "";
}

function formataTelefone (telefone){
  if(telefone){
    const telefoneSemCaracter = telefone.replace(/\D/g, '');
    const telefoneFormatado = telefoneSemCaracter.replace(/^(\d{2})(\d{5}|\d{4})(\d{4})$/, "($1) $2-$3");
    return telefoneFormatado;
  }
  return telefone = "";
}



function filtros(parametros){
  const {nome, endereco, telefone, cnpj, nomeProduto, marcaProduto,  modeloProduto} = parametros;
  let where = {};
  if(nome) where.nome = nome;
  if(endereco) where.endereco = endereco;
  if(telefone) where.telefone = formataTelefone(telefone)
  if(cnpj) where.cnpj = formatarCnpj(cnpj);

  if(nomeProduto) {
    const include = associacaoInclude(database.Produtos, 'nome', nomeProduto, 'FornecedorProduto','produtos');

    return {where, include}
  }

  if(marcaProduto){
    const include = associacaoInclude(database.Produtos, 'marca', marcaProduto, 'FornecedorProduto','produtos');

    return {where, include}
  }

  if(modeloProduto) {
    const include = associacaoInclude(database.Produtos, 
    'FornecedorProduto','produtos', 'modelo', modeloProduto);
    return {where, include}
  }
  

  return {where};
}


module.exports = FornecedorController;