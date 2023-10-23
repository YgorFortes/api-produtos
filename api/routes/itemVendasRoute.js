const Router = require('express');
const ItemVendasController = require('../controllers/ItemVendasController');
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncao = require('../middlewares/verificaFuncao.js');
const router = Router();

router
.get('/itemVendas/filtro',verificaToken, verificaFuncao, ItemVendasController.listarItemVendasPorFiltro)
.get('/itemVendas',verificaToken, verificaFuncao,  ItemVendasController.listarItemVendas)
.get('/itemVendas/:id',verificaToken,verificaFuncao, ItemVendasController.listarItemVendasPorId)
.post('/itemVendas/:id/restaurar',verificaToken, verificaFuncao,  ItemVendasController.restaurarItemVendas)
.patch('/itemVendas/:id', verificaToken, verificaFuncao, ItemVendasController.atualizarItemVenda)
.delete('/itemVendas/:id',verificaToken, verificaFuncao, ItemVendasController.deletarItemVenda)

module.exports = router;