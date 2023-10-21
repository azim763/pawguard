const Clinic = require("../models/clinicModel");

module.exports.getAllClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.find().select([
      "Name",
      "ClinicUrl",
"PhoneNumber",
"Specialty",
"OpeningHours",
"Latitude",
"Longitude",
      "_id",
    ]);
    return res.json(clinics);
  } catch (ex) {
    next(ex);
  }
};



module.exports.createClinic = async (req, res, next) => {
  try {
    const clinicData = req.body;
    const clinic = await Clinic.create(clinicData);
    return res.json(clinic);
  } catch (ex) {
    next(ex);
  }
};


// Search for clinics by species
module.exports.searchClinicsBySpecies = async (req, res, next) => {
    try {
      const species = req.query.species;
      const clinics = await Clinic.find({ Species: species });
      return res.json(clinics);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read a clinic by its ID
module.exports.getClinicById = async (req, res, next) => {
    try {
      const clinicId = req.params.id;
      const clinic = await Clinic.findById(clinicId);
      if (!clinic) {
        return res.status(404).json({ msg: 'Clinic not found' });
      }
      return res.json(clinic);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a clinic by its ID
module.exports.updateClinicById = async (req, res, next) => {
    try {
      const clinicId = req.params.id;
      const updatedClinicData = req.body;
      const updatedClinic = await Clinic.findByIdAndUpdate(
        clinicId,
        updatedClinicData,
        { new: true }
      );
      if (!updatedClinic) {
        return res.status(404).json({ msg: 'Clinic not found' });
      }
      return res.json(updatedClinic);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a clinic by its ID
module.exports.deleteClinicById = async (req, res, next) => {
    try {
      const clinicId = req.params.id;
      const deletedClinic = await Clinic.findByIdAndRemove(clinicId);
      if (!deletedClinic) {
        return res.status(404).json({ msg: 'Clinic not found' });
      }
      return res.json({ msg: 'Clinic deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  