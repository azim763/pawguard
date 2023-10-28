const mongoose = require("mongoose");

const petAppointmentSchema = new mongoose.Schema({
  PetID: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: false },
  ClinicName: { type: String, required: false },
  Latitude: { type: Number, required: true },
  Longitude: { type: Number, required: true },
  AppointmentReason: { type: String, required: false },
  AppointmentDate: { type: String, required: false },
  AppointmentTime: { type: String, required: false },
});

const PetAppointment = mongoose.model("PetAppointment", petAppointmentSchema);

module.exports = PetAppointment;
