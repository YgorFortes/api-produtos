const Router = require('express');
const ProdutosController = require('../controllers/ProdutosController.js');
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');
const router = Router();

router 
.get('/produtos/filtro',verificaToken, ProdutosController.listarProdutoPorFiltro)
.get('/produtos',verificaToken, ProdutosController.listarProdutos)
.get('/produtos/todos',verificaToken, ProdutosController.listarTodosProdutos)
.get('/produtos/:id',verificaToken, ProdutosController.listaProdutoPorId)
.post('/produtos',verificaToken, ProdutosController.criarProduto)
.post('/produtos/:id/restaurar',verificaToken,verificaFuncao, ProdutosController.restaurarProduto)
.patch('/produtos/:id',verificaToken, verificaFuncao, ProdutosController.atualizarProduto)
.delete('/produtos/:id',verificaToken, verificaFuncao, ProdutosController.deletarProduto)
.delete('/produtos/semEstoque/:id',verificaToken, verificaFuncao,  ProdutosController.desativarProdutoPorQuantidade)


module.exports = router;