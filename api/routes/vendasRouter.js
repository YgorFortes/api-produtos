const Router = require("express");
const VendasController = require("../controllers/VendasController");

const router = Router();

router
.get('/vendas/filtro', VendasController.listarVendaPorFiltro)
.get('/vendas', VendasController.listarVendas)
.get('/vendas/:id', VendasController.listarVendaPorId)
.post('/vendas/:id/restaurar', VendasController.restaurarVenda)
.post('/vendas/:idProduto/:quantidadeProdutoComprado', VendasController.criarVenda)
.put('/vendas/:id',VendasController.atualizarVenda)
.delete('/vendas/:id',VendasController.deletarVenda)

module.exports = router;
