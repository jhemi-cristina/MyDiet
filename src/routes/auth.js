const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Usuário já existe" });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, "secretKey");
    res.json({ token });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user._id }, "secretKey");
    res.json({ token });
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
