const express = require("express");
const pessoas = require("./pessoasRoute.js");
const fornecedores = require('./fornecedoresRoute.js')
const servicos = require('./servicosRoute.js')

module.exports = app => {
  app.route("/teste").get((req, res) =>{
    res.status(200).send({titulo: "Funcionando"});
  });
  app.use(
    express.json(),
    pessoas,
    fornecedores,
    servicos
    )
 
  
}