const Router = require('express');
const LoginController = require('../controllers/LoginController.js');


const router = Router();

router
.post('/login/registrar' , LoginController.criarLogin)
.post('/login', LoginController.login)


module.exports = router;