
const router = require("express").Router();
const {
  getAllPetMedications,
  createPetMedication,
  searchPetMedicationsByPetID,
  searchPetMedicationsByUserID,
  getPetMedicationById,
  updatePetMedicationById,
  deletePetMedicationById,
} = require('../controllers/petMedicationController');

// Define routes for Pet Medications
router.get('/allpetmedications', getAllPetMedications);
router.post('/create', createPetMedication);
router.get('/searchpetmedicationsbypetid', searchPetMedicationsByPetID);
router.get('/searchpetmedicationsbyuserid', searchPetMedicationsByUserID);
router.get('/getpetmedicationbyid/:id', getPetMedicationById);
router.put('/update/:id', updatePetMedicationById);
router.delete('/delete/:id', deletePetMedicationById);

module.exports = router;