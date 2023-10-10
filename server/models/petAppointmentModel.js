const mongoose = require('mongoose');

const petAppointmentSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    ClinicName: { type: String, required: true },
    AppointmentReason: { type: String, required: true },
    AppointmentDateTime: { type: Date, required: true }
});

const PetAppointment = mongoose.model('PetAppointment', petAppointmentSchema);

module.exports = PetAppointment;
