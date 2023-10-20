const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    ImageUrl: { type: String, required: true },
    ClinicUrl: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    PhoneNumber: { type: String, required: true },
    Specialty: { type: String, required: true },
    OpeningHours: { type: String, required: true },
    Rating: { type: Number, required: true },
    City:{ type: String, required: true },
    Address: { type: String, required: true },
    UrgentCare: { type: Boolean, required: true },
    Open24: { type: Boolean, required: true }
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
