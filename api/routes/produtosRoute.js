const Router = require('express');
const ProdutosController = require('../controllers/ProdutosController.js');

const router = Router();

router 
.get('/produtos',ProdutosController.listarProdutos)
.get('/produtos/:id', ProdutosController.listaProdutoPorId)
.post('/produtos', ProdutosController.criarProduto)
.post('/produtos/:id/restaurar', ProdutosController.restaurarProduto)
.put('/produtos/:id', ProdutosController.atualizarProduto)
.delete('/produtos/:id', ProdutosController.deletarProduto)


module.exports = router;