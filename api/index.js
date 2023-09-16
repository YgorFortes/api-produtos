const express = require( "express");
const routes = require("./routes/index.js");
const manipulador404 = require("./middlewares/manipulador404.js");

const app = express();

const port = 3000;

routes(app);

app.use(manipulador404)

app.listen(port, ()=> console.log(`Servidor funcionando em: http://localhost:${port}/teste`));

module.exports = app;