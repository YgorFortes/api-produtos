const Router = require("express");
const VendasController = require("../controllers/VendasController");
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');
const router = Router();

router

.get('/vendas/filtro',verificaToken, verificaFuncao, VendasController.listarVendaPorFiltro)
.get('/vendas',verificaToken, verificaFuncao, VendasController.listarVendas)
.get('/vendas/logado', verificaToken, VendasController.listarVendasPessoaLogado)
.get('/vendas/:id',verificaToken, verificaFuncao, VendasController.listarVendaPorId)
.get('/vendas/recibo/:id', verificaToken, VendasController.gerarReciboCompra)
.post('/vendas/:idVenda',verificaToken, VendasController.criarItemVenda)
.post('/vendas', verificaToken, VendasController.criarVenda)
.patch('/vendas/:id/restaurar',verificaToken, VendasController.restaurarVenda)
.patch('/vendas/:id',verificaToken, verificaFuncao, VendasController.atualizarVenda)
.delete('/vendas/:id',verificaToken, verificaFuncao, VendasController.deletarVenda)

module.exports = router;
