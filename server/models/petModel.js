const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    PetName: { type: String, required: true },
    Gender: { type: Boolean, required: true },
    Species: { type: String, required: true },
    Breed: { type: String, required: true },
    Birthday: { type: Date, required: true },
    BloodType: { type: String, required: true },
    Height: { type: Number, required: true },
    Weight: { type: Number, required: true },
    PreExistingMedical: { type: String, required: true },
    PetImageName: { type: String, required: true },
    Description: { type: String, required: true }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
