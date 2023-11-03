const mongoose = require('mongoose');

const petVaccinationSchema = new mongoose.Schema({
    UserID: {
        type: String,
          required: false,
      },
    PetID: { type: String, required: true },
    NameOfVaccination: { type: String, required: false },
    VaccinationDate: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
});


const petVaccination = mongoose.model('petVaccination', petVaccinationSchema);

module.exports = petVaccination;
