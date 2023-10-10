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
  FirstName: { 
    type: String, 
    required: true 
  },
  LastName: { 
    type: String, 
    required: true 
  },
  Address: { 
    type: String, 
    required: true ,
    default: "",
  },
  passRecovery: { 
    type: Boolean, 
    required: true ,
    default: false,
  },
  PasswordRecoveryLink: { 
    type: String, 
    required: true ,
    default: "",
  },
  MedicationNotification: { 
    type: Boolean, 
    required: true ,
    default: false,
  },
  AppointmentNotification: { 
    type: Boolean,
     required: true ,
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
});

module.exports = mongoose.model("Users", userSchema);
