const Router = require ("express");
const PessoaController = require('../controllers/PessoasController.js');
const verificaToken = require('../middlewares/verificaToken.js');

const router = Router();

router
.get('/pessoas/filtro',verificaToken, PessoaController.listarPessoaPorFiltro)
.get('/pessoas/todos',verificaToken, PessoaController.listarTodasPessoas)
.get('/pessoas/desativados', PessoaController.listarPessoasDesativadas)
.get('/pessoas/',verificaToken, PessoaController.listarPessoasAtivas)
.get('/pessoas/:id',verificaToken, PessoaController.listarPessoaPorId)
.post('/pessoas/',verificaToken, PessoaController.criarPessoa)
.post('/pessoas/:id/restaurar', verificaToken, PessoaController.restaurarPessoa)
.put('/pessoas/:id', verificaToken,PessoaController.atualizarPessoa)
.delete("/pessoas/:id", verificaToken,PessoaController.deletarPessoa)

module.exports = router;
