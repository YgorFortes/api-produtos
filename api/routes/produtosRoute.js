const Router = require('express');
const ProdutosController = require('../controllers/ProdutosController.js');
const verificaToken = require('../middlewares/verificaToken.js');
const router = Router();

router 
.get('/produtos/filtro',verificaToken, ProdutosController.listarProdutoPorFiltro)
.get('/produtos',verificaToken, ProdutosController.listarProdutos)
.get('/produtos/todos',verificaToken, ProdutosController.listarTodosProdutos)
.get('/produtos/:id',verificaToken, ProdutosController.listaProdutoPorId)
.post('/produtos',verificaToken, ProdutosController.criarProduto)
.post('/produtos/:id/restaurar',verificaToken, ProdutosController.restaurarProduto)
.put('/produtos/:id',verificaToken, ProdutosController.atualizarProduto)
.delete('/produtos/:id',verificaToken, ProdutosController.deletarProduto)
.delete('/produtos/semEstoque/:id',verificaToken, ProdutosController.desativarProdutoPorQuantidade)


module.exports = router;