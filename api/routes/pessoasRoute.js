const Router = require ( "express");
const PessoaController = require('../controllers/PessoasController.js')

const router = Router();

router
.get('/pessoas', PessoaController.listarPessoas)
.get('/pessoas/:id', PessoaController.listarPessoaPorId)
.post('/pessoas/:id', PessoaController.criarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete("/pessoas/:id", PessoaController.deletarPessoa)

module.exports = router;
