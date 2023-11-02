
const router = require("express").Router();
const {
  getAllPetVaccinations,
  createPetVaccination,
  searchPetVaccinationsByPetID,
  getPetVaccinationById,
  updatePetVaccinationById,
  deletePetVaccinationById,
} = require('../controllers/petVaccinationController');

// Define routes for Pet Vaccinations
router.get('/allpetvaccinations', getAllPetVaccinations);
router.post('/create', createPetVaccination);
router.get('/searchpetvaccinationsbypetid', searchPetVaccinationsByPetID);
router.get('/searchpetvaccinationsbyuserid', searchPetVaccinationsByUserID);
router.get('/getpetvaccinationbyid/:id', getPetVaccinationById);
router.put('/update/:id', updatePetVaccinationById);
router.delete('/delete/:id', deletePetVaccinationById);

module.exports = router;