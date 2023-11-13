const Pet = require("../models/petModel");

module.exports.getAllPets = async (req, res, next) => {
  try {
    const pets = await Pet.find();
    return res.json(pets);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPet = async (req, res, next) => {
  try {
    const petData = req.body;
    petData.timestamp = new Date();
    petData.Archive = false;
    const pet = await Pet.create(petData);
    return res.json(pet);
  } catch (ex) {
    next(ex);
  }
};

// Search for pets by UserID
module.exports.searchPetsByUserID = async (req, res, next) => {
    try {
      const userID = req.query.userID;
      const pets = await Pet.find({ UserID: userID });
      return res.json(pets);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read a pet by its ID
module.exports.getPetById = async (req, res, next) => {
    try {
      const petId = req.params.id;
      const pet = await Pet.findById(petId);
      if (!pet) {
        return res.status(404).json({ msg: 'Pet not found' });
      }
      return res.json(pet);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet by its ID
module.exports.updatePetById = async (req, res, next) => {
    try {
      const petId = req.params.id;
      const updatedPetData = req.body;
      const updatedPet = await Pet.findByIdAndUpdate(petId, updatedPetData, { new: true });
      if (!updatedPet) {
        return res.status(404).json({ msg: 'Pet not found' });
      }
      return res.json(updatedPet);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet by its ID
module.exports.deletePetById = async (req, res, next) => {
    try {
      const petId = req.params.id;
      const deletedPet = await Pet.findByIdAndRemove(petId);
      if (!deletedPet) {
        return res.status(404).json({ msg: 'Pet not found' });
      }
      return res.json({ msg: 'Pet deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  