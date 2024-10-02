const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  day: { type: String, required: true },
  meals: [
    {
      time: String,
      name: String,
      items: [String],
    },
  ],
});

const Diet = mongoose.model("Diet", DietSchema);
module.exports = Diet;
