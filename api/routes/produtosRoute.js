const Router = require('express');
const ProdutosController = require('../controllers/ProdutosController.js');

const router = Router();

router 
.get('/produtos/filtro', ProdutosController.listarProdutoPorFiltro)
.get('/produtos',ProdutosController.listarProdutos)
.get('/produtos/:id', ProdutosController.listaProdutoPorId)
.post('/produtos', ProdutosController.criarProduto)
.post('/produtos/:id/restaurar', ProdutosController.restaurarProduto)
.put('/produtos/:id', ProdutosController.atualizarProduto)
.delete('/produtos/:id', ProdutosController.deletarProduto)
.delete('/produtos/quantidade/:id', ProdutosController.desativarProdutoPorQuantidade)


module.exports = router;