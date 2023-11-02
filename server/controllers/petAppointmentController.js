const PetAppointment = require("../models/petAppointmentModel");

module.exports.getAllPetAppointments = async (req, res, next) => {
  try {
    const appointments = await PetAppointment.find();
    return res.json(appointments);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPetAppointment = async (req, res, next) => {
  try {
    const appointmentData = req.body;
    const appointment = await PetAppointment.create(appointmentData);
    return res.json(appointment);
  } catch (ex) {
    next(ex);
  }
};

// Search for pet appointments by PetID
module.exports.searchPetAppointmentsByPetID = async (req, res, next) => {
    try {
      const petID = req.query.PetID;
      const appointments = await PetAppointment.find({ PetID: petID });
      return res.json(appointments);
    } catch (ex) {
      next(ex);
    }
  };  
  
// Search for pet appointments by UserID
module.exports.searchPetAppointmentsByUserID = async (req, res, next) => {
  try {
    const userID = req.query.UserID;
    const appointments = await PetAppointment.find({ UserID: userID });
    return res.json(appointments);
  } catch (ex) {
    next(ex);
  }
};

  // Read a pet appointment by its ID
module.exports.getPetAppointmentById = async (req, res, next) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await PetAppointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ msg: 'Pet appointment not found' });
      }
      return res.json(appointment);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet appointment by its ID
module.exports.updatePetAppointmentById = async (req, res, next) => {
    try {
      const appointmentId = req.params.id;
      const updatedAppointmentData = req.body;
      const updatedAppointment = await PetAppointment.findByIdAndUpdate(
        appointmentId,
        updatedAppointmentData,
        { new: true }
      );
      if (!updatedAppointment) {
        return res.status(404).json({ msg: 'Pet appointment not found' });
      }
      return res.json(updatedAppointment);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet appointment by its ID
module.exports.deletePetAppointmentById = async (req, res, next) => {
    try {
      const appointmentId = req.params.id;
      const deletedAppointment = await PetAppointment.findByIdAndRemove(appointmentId);
      if (!deletedAppointment) {
        return res.status(404).json({ msg: 'Pet appointment not found' });
      }
      return res.json({ msg: 'Pet appointment deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  