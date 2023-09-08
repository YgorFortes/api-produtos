const Router = require('express');
const ItemVendasController = require('../controllers/ItemVendasController');

const router = Router();

router
.get('/itemVendas',ItemVendasController.listarItemVendas)
.get('/itemVendas/:id',ItemVendasController.listarItemVendasPorId)
.post('/itemVendas',ItemVendasController.criarItemVendas)
.post('/itemVendas/:id/restaurar', ItemVendasController.restaurarItemVendas)
.put('/itemVendas/:id', ItemVendasController.atualizarItemVenda)
.delete('/itemVendas/:id',ItemVendasController.deletarItemVenda)

module.exports = router;