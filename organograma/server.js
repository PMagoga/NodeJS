const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3300;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota para pegar os dados
app.get("/api/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Erro ao ler arquivo");
    res.json(JSON.parse(data));
  });
});

// Rota para salvar mudanças
app.post("/api/data", (req, res) => {
  fs.writeFile("data.json", JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send("Erro ao salvar arquivo");
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
