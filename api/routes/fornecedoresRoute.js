const Router = require ( "express");
const FornecedorController = require('../controllers/FornecedoresController');

const router = Router();

router
.get('/fornecedores', FornecedorController.listarFornecedores)
.get('/fornecedores/:id',FornecedorController.listarFonecedorPorId)
.post('/fornecedores/',FornecedorController.criarFornecedor)
.post('/fornecedores/:id/restaurar', FornecedorController.restaurarFornecedor)
.put('/fornecedores/:id', FornecedorController.atualizarFornecedor)
.delete('/fornecedores/:id', FornecedorController.deletarFornecedor)
  



module.exports =  router;