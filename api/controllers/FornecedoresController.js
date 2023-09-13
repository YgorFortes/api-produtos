const database = require('../models/index.js');
const associacaoInclude = require('../funcoesEspecificas/funcaoInclude.js')
class FornecedorController{

  static async listarFornecedores(__, res) {
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
      return res.status(200).json(resultadoListaFornecedores);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listarFonecedorPorId(req, res){
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
        })
        return res.status(200).json(resultadoFornecedorPorId)
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async listarFornecedorPorFiltro(req, res){
    const where = filtros(req.query);
    console.log(where)
    try {
      const resultadoFiltro = await database.Fornecedores.findAll({...where});
      return res.status(200).json(resultadoFiltro)
    } catch (erro) {
      return res.status(500).json(erro.mensage)
    }
  }

  static async criarFornecedor(req, res){
    const {cnpj,telefone,produtos, ...informacaoNovoFornecedor} = req.body;
    const cnpjFormatado = formatarCnpj(cnpj);
    const telefoneFormatado = formataTelefone (telefone);
    try {
      const [novoFornecedor, criado] = await database.Fornecedores.findOrCreate(
        {
          where: { cnpj : cnpjFormatado, telefone: telefoneFormatado}, 
          defaults: {...informacaoNovoFornecedor}
        }
      );

      if(criado){
        await novoFornecedor.setProdutos(produtos)
        return res.status(200).json(novoFornecedor)
      }else{
        return res.status(409).json({mensagem: 'Cnpj já cadastrado'});
      }
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarFornecedor (req, res){
    const {id} = req.params;
    const {produtos, infoFornecedor} = req.body;

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
      await fornecedorAtualizadoEncontrado.setProdutos(produtos);
      res.status(200).json(fornecedorAtualizadoEncontrado);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async deletarFornecedor(req, res){
    const {id} = req.params;
    try {
      await database.Fornecedores.destroy( 
        {
          where: {id: Number(id)}
        }
      );
      res.status(200).json({mensagem: `Id ${id} deletado com sucesso`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async restaurarFornecedor(req, res){
    const {id} = req.params;
    try {
      await database.Fornecedores.restore(
        {
          where:{ id: Number(id)}
        }
      )
      return res.status(200).json({mensagem: `Id: ${id} restaurado`});
    } catch (erro) {
      return res.status(500).json(erro.message);
    }

  }

}

function formatarCnpj(cnpj){
  const cnpjSemCaracter = cnpj.replace(/\D/g, '');
  const cnpjFormatado = cnpjSemCaracter.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
  return cnpjFormatado
}

function formataTelefone (telefone){
  const telefoneSemCaracter = telefone.replace(/\D/g, '');
  const telefoneFormatado = telefoneSemCaracter.replace(/^(\d{2})(\d{5}|\d{4})(\d{4})$/, "($1) $2-$3");
  return telefoneFormatado;
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