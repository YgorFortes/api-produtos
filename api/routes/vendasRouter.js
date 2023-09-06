const Router = require("express");
const VendasController = require("../controllers/VendasController");

const router = Router();

router
.get('/vendas', VendasController.listarVendas)
.get('/vendas/:id', VendasController.listarVendaPorId)
.post('/vendas', VendasController.criarVenda)
.post('/vendas/:id/restaurar',VendasController.restaurarVenda)
.put('/vendas/:id',VendasController.atualizarVenda)
.delete('/vendas/:id',VendasController.deletarVenda)

module.exports = router;
