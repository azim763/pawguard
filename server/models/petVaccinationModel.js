const mongoose = require('mongoose');

const petVaccinationSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'pet', required: true },
    NameOfVaccination: { type: String, required: true },
    VaccinationDate: { type: Date, required: true },
    timestamp: { type: Date, default: Date.now },
});


const petVaccination = mongoose.model('petVaccination', petVaccinationSchema);

module.exports = petVaccination;
