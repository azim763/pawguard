const mongoose = require("mongoose");

const petLogSchema = new mongoose.Schema({
  PetID: { type: String, required: true },
  LogDate: { type: String, required: false },
  Weight: { type: Number, required: false },
  ActivityLevel: { type: String, required: false },
  UrineAmount: { type: String, required: false },
  StoolAmount: { type: String, required: false },
  StoolAppearance: { type: String, required: false },
  PetImages: [{ type: String }],
  Notes: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
});

const PetLog = mongoose.model("PetLog", petLogSchema);

module.exports = PetLog;
