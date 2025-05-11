// keepAlive.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot está vivo!");
});
app.get("/healthz", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Keep-alive rodando na porta ${PORT}`);
});
