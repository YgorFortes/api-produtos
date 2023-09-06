const Router = require ("express");
const PessoaController = require('../controllers/PessoasController.js')

const router = Router();

router
.get('/pessoas', PessoaController.listarPessoas)
.get('/pessoas/:id', PessoaController.listarPessoaPorId)
.post('/pessoas/', PessoaController.criarPessoa)
.post('/pessoas/:id/restaurar', PessoaController.restaurarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete("/pessoas/:id", PessoaController.deletarPessoa)

module.exports = router;
