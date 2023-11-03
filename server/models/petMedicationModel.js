const mongoose = require('mongoose');

const petMedicationSchema = new mongoose.Schema({
    UserID: {
        type: String,
          required: true,
      },
    PetID: { type: String, required: false },
    MedicineName: { type: String, required: false },
    DosageAmount: { type: String, required: false },
    MedicationPeriod: { type: String, required: false },
    MedicationDate: { type: Date, required: false },
    timestamp: { type: Date, default: Date.now },
});

const PetMedication = mongoose.model('PetMedication', petMedicationSchema);

module.exports = PetMedication;
