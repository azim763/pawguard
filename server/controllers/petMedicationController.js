const PetMedication = require("../models/petMedicationModel");

module.exports.getAllPetMedications = async (req, res, next) => {
  try {
    const medications = await PetMedication.find();
    return res.json(medications);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPetMedication = async (req, res, next) => {
  try {
    const medicationData = req.body;
    PetMedication.timestamp = new Date();
    const medication = await PetMedication.create(medicationData);
    return res.json(medication);
  } catch (ex) {
    next(ex);
  }
};

// Search for pet medications by PetID
module.exports.searchPetMedicationsByPetID = async (req, res, next) => {
    try {
      const petID = req.query.PetID;
      const medications = await PetMedication.find({ PetID: petID });
      return res.json(medications);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read a pet medication record by its ID
module.exports.getPetMedicationById = async (req, res, next) => {
    try {
      const medicationId = req.params.id;
      const medication = await PetMedication.findById(medicationId);
      if (!medication) {
        return res.status(404).json({ msg: 'Pet medication record not found' });
      }
      return res.json(medication);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet medication record by its ID
module.exports.updatePetMedicationById = async (req, res, next) => {
    try {
      const medicationId = req.params.id;
      const updatedMedicationData = req.body;
      const updatedMedication = await PetMedication.findByIdAndUpdate(
        medicationId,
        updatedMedicationData,
        { new: true }
      );
      if (!updatedMedication) {
        return res.status(404).json({ msg: 'Pet medication record not found' });
      }
      return res.json(updatedMedication);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet medication record by its ID
module.exports.deletePetMedicationById = async (req, res, next) => {
    try {
      const medicationId = req.params.id;
      const deletedMedication = await PetMedication.findByIdAndRemove(medicationId);
      if (!deletedMedication) {
        return res.status(404).json({ msg: 'Pet medication record not found' });
      }
      return res.json({ msg: 'Pet medication record deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };

  