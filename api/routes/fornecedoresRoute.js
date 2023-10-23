const Router = require ( "express");
const FornecedorController = require('../controllers/FornecedoresController');
const verificaToken = require('../middlewares/verificaToken.js');
const router = Router();

router
.get('/fornecedores/filtro',verificaToken, FornecedorController.listarFornecedorPorFiltro)
.get('/fornecedores',verificaToken, FornecedorController.listarFornecedores)
.get('/fornecedores/:id',verificaToken, FornecedorController.listarFonecedorPorId)
.post('/fornecedores/',verificaToken, FornecedorController.criarFornecedor)
.post('/fornecedores/:id/restaurar',verificaToken, FornecedorController.restaurarFornecedor)
.patch('/fornecedores/:id',verificaToken, FornecedorController.atualizarFornecedor)
.delete('/fornecedores/:id',verificaToken, FornecedorController.deletarFornecedor)
  



module.exports =  router;