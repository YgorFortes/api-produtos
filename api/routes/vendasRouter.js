const Router = require("express");
const VendasController = require("../controllers/VendasController");
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');
const router = Router();

router

.get('/vendas/filtro',verificaToken, verificaFuncao, VendasController.listarVendaPorFiltro)
.get('/vendas',verificaToken, verificaFuncao, VendasController.listarVendas)
.get('/vendas/:id',verificaToken, verificaFuncao, VendasController.listarVendaPorId)
.post('/vendas/:id/restaurar',verificaToken, VendasController.restaurarVenda)
.post('/vendas/produto',verificaToken, VendasController.criarVenda)
.put('/vendas/:id',verificaToken, verificaFuncao, VendasController.atualizarVenda)
.delete('/vendas/:id',verificaToken, verificaFuncao, VendasController.deletarVenda)

module.exports = router;
