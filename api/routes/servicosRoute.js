const Router = require("express");
const ServicosController = require("../controllers/ServicosController");
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');

const router = Router();

router
.get('/servicos/filtro',verificaFuncao, verificaToken, ServicosController.listarServicosPorFiltro)
.get('/servicos',verificaFuncao, verificaToken, ServicosController.listarServicos)
.get('/servicos/logado', verificaToken, ServicosController.listarServicoDaPessoaLogado)
.get('/servicos/:id',verificaFuncao, verificaToken, ServicosController.listaServicosPorId)
.post('/servicos',verificaToken, ServicosController.criarServico)
.post('/servicos/:id/restaurar',verificaFuncao, verificaToken, ServicosController.restaurarServico)
.put('/servicos/:id',verificaFuncao, verificaToken, ServicosController.atualizarServico)
.put('/servicos/logado/:id', verificaToken, ServicosController.atualizaServicosPessoaLogado)
.delete('/servicos/:id',verificaFuncao, verificaToken, ServicosController.deletarServico)

module.exports = router;