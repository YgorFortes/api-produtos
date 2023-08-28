const Router = require("express");
const ServicosController = require("../controllers/ServicosController");


const router = Router();

router
  .get('/servicos',ServicosController.listarServicos)
  .get('/servicos/:id',ServicosController.listaServicosPorId)

module.exports = router;