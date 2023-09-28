const Router = require("express");
const ServicosController = require("../controllers/ServicosController");
const verificaToken = require('../middlewares/verificaToken.js');

const router = Router();

router
.get('/servicos/filtro',verificaToken, ServicosController.listarServicosPorFiltro)
.get('/servicos',verificaToken, ServicosController.listarServicos)
.get('/servicos/:id',verificaToken, ServicosController.listaServicosPorId)
.post('/servicos',verificaToken, ServicosController.criarServico)
.post('/servicos/:id/restaurar',verificaToken, ServicosController.restaurarServico)
.put('/servicos/:id',verificaToken, ServicosController.atualizarServico)
.delete('/servicos/:id',verificaToken, ServicosController.deletarServico)

module.exports = router;