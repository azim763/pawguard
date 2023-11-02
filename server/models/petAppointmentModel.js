const mongoose = require("mongoose");

const petAppointmentSchema = new mongoose.Schema({
    UserID: {
        type: String,
          required: false,
      },
    PetID: { type: String, required: true },
    ClinicName: { type: String, required: false },
    AppointmentReason: { type: String, required: false },
    AppointmentDate: { type: String, required: false },
    AppointmentTime: { type: String, required: false },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true }
});

const PetAppointment = mongoose.model("PetAppointment", petAppointmentSchema);

module.exports = PetAppointment;
