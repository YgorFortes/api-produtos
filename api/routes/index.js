const express = require("express");
const pessoas = require("./pessoasRoute.js");
const fornecedores = require('./fornecedoresRoute.js')
const servicos = require('./servicosRoute.js')
const vendas = require('./vendasRouter.js');
const produtos = require('./produtosRoute.js')
const itemVendas = require('./itemVendasRoute.js')

module.exports = app => {
  app.route("/teste").get((req, res) =>{
    res.status(200).send({titulo: "Funcionando"});
  });
  app.use(
    express.json(),
    pessoas,
    fornecedores,
    servicos,
    vendas,
    produtos,
    itemVendas
  )
 
  
}