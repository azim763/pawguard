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
    const pets = await Pet.find({ UserID: userID, Archive: { $ne: true } });
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
      return res.status(404).json({ msg: "Pet not found" });
    }
    return res.json(pet);
  } catch (ex) {
    next(ex);
  }
};

module.exports.patchPetById = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const updatedPetData = req.body;

    // Fetch the current pet data from the database
    const currentPet = await Pet.findById(petId);

    if (!currentPet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    // Identify the fields that have changed
    const changedFields = {};
    for (const key in updatedPetData) {
      if (
        updatedPetData.hasOwnProperty(key) &&
        currentPet[key] !== updatedPetData[key]
      ) {
        changedFields[key] = updatedPetData[key];
      }
    }

    // Update only the fields that have changed
    const updatedPet = await Pet.findByIdAndUpdate(petId, changedFields, {
      new: true,
    });

    return res.json(updatedPet);
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
      return res.status(404).json({ msg: "Pet not found" });
    }
    return res.json({ msg: "Pet deleted successfully" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.findByIdAndUpdateArchive = async (req, res, next) => {
  try {
    const petId = req.params.id;

    // Find the pet by ID and update the "archive" field to true
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { Archive: true },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    return res.json(updatedPet);
  } catch (ex) {
    next(ex);
  }
};
