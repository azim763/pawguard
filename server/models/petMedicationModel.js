const mongoose = require('mongoose');

const petMedicationSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    MedicineName: { type: String, required: true },
    DosageAmount: { type: String, required: true },
    MedicationPeriod: { type: String, required: true }
});

const PetMedication = mongoose.model('PetMedication', petMedicationSchema);

module.exports = PetMedication;
