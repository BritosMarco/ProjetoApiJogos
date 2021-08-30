const express = require("express");
const JogoSchema = require("./models/Jogo");
const mongoose = require("./database");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "API JOGOS" });
});

// [GET] 
app.get("/jogos", async (req, res) => {
  const jogos = await JogoSchema.find();
  res.send({ jogos });
});

// [GET] Id
app.get("/jogos/:id", async (req, res) => {
  const id = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }
  
  const jogo = await JogoSchema.findById(id);

 
  if (!jogo) {
    res.status(404).send({ erro: "Jogo não encontrado!" });
    return;
  }
  res.send({ jogo });
});

// [POST] 
app.post("/jogos", async (req, res) => {
  const jogo = req.body;

  if (!jogo || !jogo.nome || !jogo.fabricante || !jogo.ano) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  const novoJogo = await new JogoSchema(jogo).save();

  res.status(201).send({ novoJogo });
});

// [PUT] 
app.put("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ erro: "Jogo não encontrado!" });
    return;
  }

  const novoJogo = req.body;

  if (!jogo || !jogo.nome || !jogo.fabricante || !jogo.ano) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  await JogoSchema.findOneAndUpdate({ _id: id }, novoJogo);
  const jogoAtualizado = await JogoSchema.findById(id);

  res.send({ jogoAtualizado });
});

// [DELETE]
app.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido" });
    return;
  }

  const jogo = await JogoSchema.findById(id);

  if (!jogo) {
    res.status(404).send({ error: "Jogo não encontrado!" });
    return;
  }

  await JogoSchema.findByIdAndDelete(id);
  res.send({message: 'Jogo excluído com sucesso!'})
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
/* Respostas de informação (100-199),
Respostas de sucesso (200-299),
Redirecionamentos (300-399)
Erros do cliente (400-499)
Erros do servidor (500-599) */





