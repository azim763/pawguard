const mongoose = require('mongoose');

const petMedicationSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: false },
    MedicineName: { type: String, required: false },
    DosageAmount: { type: String, required: false },
    MedicationPeriod: { type: String, required: false }
});

const PetMedication = mongoose.model('PetMedication', petMedicationSchema);

module.exports = PetMedication;
