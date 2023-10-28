const PetVaccination = require("../models/petVaccinationModel");

module.exports.getAllPetVaccinations = async (req, res, next) => {
  try {
    const vaccinations = await PetVaccination.find();
    return res.json(vaccinations);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPetVaccination = async (req, res, next) => {
  try {
    const vaccinationData = req.body;
   // const {petid,nameOfvaccination, vaccinationdate } = req.body;
   vaccinationData.timestamp = new Date();
    const vaccination = await PetVaccination.create(vaccinationData);
    return res.json(vaccination);
  } catch (ex) {
    next(ex);
  }
};

// Search for pet vaccinations by PetID
module.exports.searchPetVaccinationsByPetID = async (req, res, next) => {
    try {
      const petID = req.query.PetID;
      const vaccinations = await PetVaccination.find({ PetID: petID });
      return res.json(vaccinations);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read a pet vaccination record by its ID
module.exports.getPetVaccinationById = async (req, res, next) => {
    try {
      const vaccinationId = req.params.id;
      const vaccination = await PetVaccination.findById(vaccinationId);
      if (!vaccination) {
        return res.status(404).json({ msg: 'Pet vaccination record not found' });
      }
      return res.json(vaccination);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet vaccination record by its ID
module.exports.updatePetVaccinationById = async (req, res, next) => {
    try {
      const vaccinationId = req.params.id;
      const updatedVaccinationData = req.body;
      const updatedVaccination = await PetVaccination.findByIdAndUpdate(
        vaccinationId,
        updatedVaccinationData,
        { new: true }
      );
      if (!updatedVaccination) {
        return res.status(404).json({ msg: 'Pet vaccination record not found' });
      }
      return res.json(updatedVaccination);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet vaccination record by its ID
module.exports.deletePetVaccinationById = async (req, res, next) => {
    try {
      const vaccinationId = req.params.id;
      const deletedVaccination = await PetVaccination.findByIdAndRemove(vaccinationId);
      if (!deletedVaccination) {
        return res.status(404).json({ msg: 'Pet vaccination record not found' });
      }
      return res.json({ msg: 'Pet vaccination record deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };

  