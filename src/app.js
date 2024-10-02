const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const dietRoutes = require("./routes/diet");

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/diet", dietRoutes);

mongoose
  .connect("mongodb://localhost:27017/myDiet", {})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
