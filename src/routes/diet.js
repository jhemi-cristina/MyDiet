const express = require("express");
const Diet = require("../models/Diet");
const auth = require("../middleware/auth");
const router = express.Router();

// Rota para cadastrar uma dieta
router.post("/add", auth, async (req, res) => {
  const { day, meals } = req.body;

  try {
    const diet = new Diet({
      userId: req.user.id,
      day,
      meals,
    });
    await diet.save();
    res.json(diet);
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

// Rota para visualizar a dieta
router.get("/", auth, async (req, res) => {
  try {
    const diets = await Diet.find({ userId: req.user.id });
    res.json(diets);
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
