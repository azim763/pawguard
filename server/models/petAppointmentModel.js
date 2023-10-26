const mongoose = require('mongoose');

const petAppointmentSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: false },
    ClinicName: { type: String, required: false },
    AppointmentReason: { type: String, required: false },
    AppointmentDateTime: { type: Date, required: false },
    timestamp: { type: Date, default: Date.now },
});

const PetAppointment = mongoose.model('PetAppointment', petAppointmentSchema);

module.exports = PetAppointment;
