
const router = require("express").Router();

const {
  getAllPetFoods,
  createPetFood,
  searchPetFoodByPetID,
  getPetFoodById,
  updatePetFoodById,
  deletePetFoodById,
} = require('../controllers/petFoodController');

// Define routes for Pet Foods
router.get('/allpetfoods', getAllPetFoods);
router.post('/create', createPetFood);
router.get('/searchpetfoodbypetid', searchPetFoodByPetID);
router.get('/getpetfoodbyid/:id', getPetFoodById);
router.put('/update/:id', updatePetFoodById);
router.delete('/delete/:id', deletePetFoodById);

module.exports = router;