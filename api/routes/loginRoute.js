const Router = require('express');
const LoginController = require('../controllers/LoginController.js');
const verificaToken = require('../middlewares/verificaToken.js');
const verificaFuncionarioAtivo = require('../middlewares/verificaFuncionarioAtivo.js');
const router = Router();

router
.post('/login/registrar' , LoginController.criarLogin)
.post('/login', verificaFuncionarioAtivo, LoginController.login)
.put('/login', verificaToken,  LoginController.atualizarLogin)


module.exports = router;