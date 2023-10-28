const mongoose = require("mongoose");

const petFoodSchema = new mongoose.Schema({
  PetID: { type: String, required: true },
  MealPerDay: { type: Number, required: false },
  QuantityPerMeal: { type: Number, required: false },
  FoodName: { type: String, required: false },
  FoodDate: { type: String, required: false },
  KibbleDry: { type: Boolean, required: false },
  Canned: { type: Boolean, required: false },
  SemiMoist: { type: Boolean, required: false },
  HomeCooked: { type: Boolean, required: false },
  Raw: { type: Boolean, required: false },
  timestamp: { type: Date, default: Date.now },
});

const PetFood = mongoose.model("PetFood", petFoodSchema);

module.exports = PetFood;
