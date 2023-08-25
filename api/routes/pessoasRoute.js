const Router = require ( "express");
const PessoaController = require('../controllers/PessoasController.js')

const router = Router();

router
.get('/pessoas', PessoaController.listarPessoas)
.get('/pessoas/:id', PessoaController.listarPessoaPorId)
.post('/pessoas/:id', PessoaController.criarPessoa)

module.exports = router;
