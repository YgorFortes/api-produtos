const Router = require('express');
const ProdutosController = require('../controllers/ProdutosController.js');

const router = Router();

router 
.get('/produtos',ProdutosController.listarProdutos)
.get('/produtos/:id', ProdutosController.listaProdutoPorId)


module.exports = router;