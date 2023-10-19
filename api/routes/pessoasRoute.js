const Router = require ("express");
const PessoaController = require('../controllers/PessoasController.js');
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');
const router = Router();

router
.get('/pessoas/filtro',verificaToken, verificaFuncao, PessoaController.listarPessoaPorFiltro)
.get('/pessoas/todos',verificaToken, verificaFuncao, PessoaController.listarTodasPessoas)
.get('/pessoas/desativados', verificaFuncao, PessoaController.listarPessoasDesativadas)
.get('/pessoas/',verificaToken,verificaFuncao, PessoaController.listarPessoasAtivas)
.get('/pessoas/detalhar',verificaToken,  PessoaController.detalharPessoa)
.get('/pessoas/:id',verificaToken, verificaFuncao, PessoaController.listarPessoaPorId)
.post('/pessoas/',verificaToken,  PessoaController.criarPessoa)
.post('/pessoas/:id/restaurar',  verificaToken, verificaFuncao, PessoaController.restaurarPessoa)
.put('/pessoas/atualizar', verificaToken,verificaFuncao, PessoaController.atualizarPessoaLogada)
.put('/pessoas/logada/:id', verificaToken,PessoaController.atualizarPessoa)
.delete("/pessoas/:id", verificaToken, verificaFuncao, PessoaController.deletarPessoa)

module.exports = router;
