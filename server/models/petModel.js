const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  PetName: { type: String, required: true },
  Gender: { type: String, required: true },
  Species: { type: String, required: true },
  Breed: { type: String, required: true },
  Birthday: { type: Date, required: true },
  BloodType: { type: String, required: true },
  Height: { type: Number, required: true },
  Weight: { type: Number, required: true },
  PreExistingMedical: { type: String, required: false },
  PetImageName: { type: String, required: false },
  Description: { type: String, required: false },
  Archive: { type: Boolean, default: false, required: false },
  timestamp: { type: Date, default: Date.now },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
