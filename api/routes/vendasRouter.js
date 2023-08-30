const Router = require("express");
const VendasController = require("../controllers/VendasController");

const router = Router();

router
  .get('/vendas', VendasController.listarVendas)
  .get('/vendas/:id', VendasController.listarVendaPorId)
  .post('/vendas', VendasController.criarVenda)
  .put('/vendas/:id',VendasController.atualizarVenda)
  .delete('/vendas/:id',VendasController.deletarVenda)

module.exports = router;