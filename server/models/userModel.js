const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: false ,
    default: "",
  },
  passrecovery: { 
    type: Boolean, 
    required: false ,
    default: false,
  },
  PasswordRecoveryLink: { 
    type: String, 
    required: false ,
    default: "",
  },
  MedicationNotification: { 
    type: Boolean, 
    required: false ,
    default: false,
  },
  AppointmentNotification: { 
    type: Boolean,
     required: false ,
     default: false
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  }, 
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
