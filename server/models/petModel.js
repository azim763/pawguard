const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  PetName: { type: String, required: false },
  Gender: { type: String, required: false },
  Species: { type: String, required: false },
  Breed: { type: String, required: false },
  Birthday: { type: Date, required: false },
  BloodType: { type: String, required: false },
  Height: { type: Number, required: false },
  Weight: { type: Number, required: false },
  PreExistingMedical: { type: String, required: false },
  PetImageName: { type: String, required: false },
  Description: { type: String, required: false },
  Archive: { type: Boolean, default: false, required: false },
  timestamp: { type: Date, default: Date.now },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
