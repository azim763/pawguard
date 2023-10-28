const mongoose = require("mongoose");

const petAppointmentSchema = new mongoose.Schema({
    PetID: { type: String, required: false },
    ClinicName: { type: String, required: false },
    AppointmentReason: { type: String, required: false },
    AppointmentDate: { type: String, required: false },
    AppointmentTime: { type: String, required: false }
});

const PetAppointment = mongoose.model("PetAppointment", petAppointmentSchema);

module.exports = PetAppointment;
