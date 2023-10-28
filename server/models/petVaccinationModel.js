const mongoose = require('mongoose');

const petVaccinationSchema = new mongoose.Schema({
    PetID: { type: String, required: true },
    NameOfVaccination: { type: String, required: true },
    VaccinationDate: { type: Date, required: true },
    timestamp: { type: Date, default: Date.now },
});


const petVaccination = mongoose.model('petVaccination', petVaccinationSchema);

module.exports = petVaccination;
