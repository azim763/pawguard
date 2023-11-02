const PetFood = require("../models/petFoodModel");

module.exports.getAllPetFoods = async (req, res, next) => {
  try {
    const foods = await PetFood.find();
    return res.json(foods);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPetFood = async (req, res, next) => {
  try {
    const foodData = req.body;
    foodData.timestamp = new Date();
    const food = await PetFood.create(foodData);
    return res.json(food);
  } catch (ex) {
    next(ex);
  }
};
// Search for pet food by PetID
module.exports.searchPetFoodByPetID = async (req, res, next) => {
    try {
      const petID = req.query.PetID;
      const foods = await PetFood.find({ PetID: petID });
      return res.json(foods);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Search for pet food by UserID
module.exports.searchPetFoodByUserID = async (req, res, next) => {
  try {
    const userID = req.query.UserID;
    const foods = await PetFood.find({ UserID: userID });
    return res.json(foods);
  } catch (ex) {
    next(ex);
  }
};

  // Read a pet food record by its ID
module.exports.getPetFoodById = async (req, res, next) => {
    try {
      const foodId = req.params.id;
      const food = await PetFood.findById(foodId);
      if (!food) {
        return res.status(404).json({ msg: 'Pet food record not found' });
      }
      return res.json(food);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet food record by its ID
module.exports.updatePetFoodById = async (req, res, next) => {
    try {
      const foodId = req.params.id;
      const updatedFoodData = req.body;
      const updatedFood = await PetFood.findByIdAndUpdate(
        foodId,
        updatedFoodData,
        { new: true }
      );
      if (!updatedFood) {
        return res.status(404).json({ msg: 'Pet food record not found' });
      }
      return res.json(updatedFood);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet food record by its ID
module.exports.deletePetFoodById = async (req, res, next) => {
    try {
      const foodId = req.params.id;
      const deletedFood = await PetFood.findByIdAndRemove(foodId);
      if (!deletedFood) {
        return res.status(404).json({ msg: 'Pet food record not found' });
      }
      return res.json({ msg: 'Pet food record deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  