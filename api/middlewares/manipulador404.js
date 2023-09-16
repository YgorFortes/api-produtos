const { Sequelize } = require("sequelize");


function manipulador404(erro, req, res, next){
    if(erro instanceof Sequelize.Error){
   
      res.status(500).send({menssaga: "Erro interno no servidor"})
    }
}

module.exports = manipulador404;