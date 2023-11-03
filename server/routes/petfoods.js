
const router = require("express").Router();

const {
  getAllPetFoods,
  createPetFood,
  searchPetFoodByPetID,
  searchPetFoodByUserID,
  getPetFoodById,
  updatePetFoodById,
  deletePetFoodById,
} = require('../controllers/petFoodController');

// Define routes for Pet Foods
router.get('/allpetfoods', getAllPetFoods);
router.post('/create', createPetFood);
router.get('/searchpetfoodbypetid/:petID', searchPetFoodByPetID);
router.get('/searchpetfoodbyuserid', searchPetFoodByUserID);
router.get('/getpetfoodbyid/:id', getPetFoodById);
router.put('/update/:id', updatePetFoodById);
router.delete('/delete/:id', deletePetFoodById);

module.exports = router;