import express from "express";

const app = express();

app.use(express.json())

const port = 3000;

app.get('/teste', (req, res)=> res.status(200).send({mensagem: 'Funcionando'}));

app.listen(port, ()=> console.log(`Servidor funcionando em: http://localhost:${port}/teste`));

export default app;
