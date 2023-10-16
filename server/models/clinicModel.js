const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    Species: { type: String, required: true },
    Breed: { type: String, required: true },
    Name: { type: String, required: true },
    ImageUrl: { type: String, required: true },
    ClinicUrl: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    PhoneNumber: { type: String, required: true },
    Specialty: { type: String, required: true },
    OpeningHours: { type: String, required: true }
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;