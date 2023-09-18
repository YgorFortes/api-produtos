const express = require( "express");
const routes = require("./routes/index.js");
const manipuladorErros = require('./middlewares/manipuladorErros.js')

const app = express();

const port = 3000;

routes(app);

app.use(manipuladorErros)

app.use( (req, res, next)=>{
  res.status(404).json({Mensagem: "Página não encontrada"})
})

app.listen(port, ()=> console.log(`Servidor funcionando em: http://localhost:${port}/teste`));

module.exports = app;