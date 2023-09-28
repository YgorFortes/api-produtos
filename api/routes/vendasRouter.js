const Router = require("express");
const VendasController = require("../controllers/VendasController");
const verificaToken = require('../middlewares/verificaToken.js');

const router = Router();

router

.get('/vendas/filtro',verificaToken, VendasController.listarVendaPorFiltro)
.get('/vendas',verificaToken, VendasController.listarVendas)
.get('/vendas/:id',verificaToken, VendasController.listarVendaPorId)
.post('/vendas/:id/restaurar',verificaToken, VendasController.restaurarVenda)
.post('/vendas/produto/:idProduto/quantidade/:quantidadeProdutoComprado',verificaToken, VendasController.criarVenda)
.put('/vendas/:id',verificaToken, VendasController.atualizarVenda)
.delete('/vendas/:id',verificaToken, VendasController.deletarVenda)

module.exports = router;
