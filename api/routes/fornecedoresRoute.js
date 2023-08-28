const Router = require ( "express");
const FornecedorController = require('../controllers/FornecedoresController');

const router = Router();

router
  .get('/fornecedores', FornecedorController.listarFornecedores)



module.exports =  router;