const mongoose = require('mongoose');

const petFoodSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    MealPerDay: { type: Number, required: true },
    QuantityPerMeal: { type: Number, required: true },
    FoodName: { type: String, required: true },
    FoodDate: { type: Date, required: true },
    KibbleDry: { type: Boolean, required: true },
    Canned: { type: Boolean, required: true },
    SemiMoist: { type: Boolean, required: true },
    HomeCooked: { type: Boolean, required: true },
    Raw: { type: Boolean, required: true }
});

const PetFood = mongoose.model('PetFood', petFoodSchema);

module.exports = PetFood;
