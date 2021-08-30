const mongoose = require("../database/index");

const JogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  fabricante: {
    type: String,
    require: true,
  },
  ano: {
    type: Number,
    require: true,
  },
});

const Jogo = mongoose.model("Jogo", JogoSchema);

module.exports = Jogo;