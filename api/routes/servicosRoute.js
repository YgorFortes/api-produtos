const Router = require("express");
const ServicosController = require("../controllers/ServicosController");


const router = Router();

router
  .get('/servicos',ServicosController.listarServicos)
  .get('/servicos/:id',ServicosController.listaServicosPorId)
  .post('/servicos', ServicosController.criarServico)
  .put('/servicos/:id',ServicosController.atualizarServico)
  .delete('/servicos/:id', ServicosController.deletarServico)

module.exports = router;