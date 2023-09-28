const Router = require('express');
const LoginController = require('../controllers/LoginController.js');


const router = Router();

router
.post('/login/registrar' , LoginController.criarLogin);


module.exports = router;