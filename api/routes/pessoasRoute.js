const Router = require ("express");
const PessoaController = require('../controllers/PessoasController.js');
const verificaToken = require('../middlewares/verificaToken.js');
const verificaPapel = require('../middlewares/verificaPapel.js');
const router = Router();

router
.get('/pessoas/filtro',verificaToken, verificaPapel, PessoaController.listarPessoaPorFiltro)
.get('/pessoas/todos',verificaToken, verificaPapel, PessoaController.listarTodasPessoas)
.get('/pessoas/desativados', verificaPapel, PessoaController.listarPessoasDesativadas)
.get('/pessoas/',verificaToken,verificaPapel, PessoaController.listarPessoasAtivas)
.get('/pessoas/detalhar',verificaToken,  PessoaController.detalharPessoa)
.get('/pessoas/:id',verificaToken, verificaPapel, PessoaController.listarPessoaPorId)
.post('/pessoas/',verificaToken,  PessoaController.criarPessoa)
.post('/pessoas/:id/restaurar',  verificaToken, verificaPapel, PessoaController.restaurarPessoa)
.put('/pessoas/atualizar', verificaToken, PessoaController.atualizarPessoaLogada)
.put('/pessoas/:id', verificaToken,PessoaController.atualizarPessoa)
.delete("/pessoas/:id", verificaToken, verificaPapel, PessoaController.deletarPessoa)

module.exports = router;
