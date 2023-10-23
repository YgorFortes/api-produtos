const Router = require('express');
const ItemVendasController = require('../controllers/ItemVendasController');
const verificaToken = require('../middlewares/verificaToken.js');
const router = Router();

router
.get('/itemVendas/filtro',verificaToken, ItemVendasController.listarItemVendasPorFiltro)
.get('/itemVendas',verificaToken, ItemVendasController.listarItemVendas)
.get('/itemVendas/:id',verificaToken, ItemVendasController.listarItemVendasPorId)
.post('/itemVendas/:id/restaurar',verificaToken, ItemVendasController.restaurarItemVendas)
.patch('/itemVendas/:id', ItemVendasController.atualizarItemVenda)
.delete('/itemVendas/:id',verificaToken, ItemVendasController.deletarItemVenda)

module.exports = router;