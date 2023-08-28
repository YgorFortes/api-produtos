const Router = require ( "express");
const FornecedorController = require('../controllers/FornecedoresController');

const router = Router();

router
  .get('/fornecedores', FornecedorController.listarFornecedores)
  .get('/fornecedores/:id',FornecedorController.listarFonecedorPorId)
  .post('/fornecedores', FornecedorController.criarFornecedor)
  .put('/fornecedores/:id', FornecedorController.atualizarFornecedor)



module.exports =  router;