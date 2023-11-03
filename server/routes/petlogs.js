
const router = require("express").Router();
const {
  getAllPetLogs,
  createPetLog,
  searchPetLogsByPetID,
  getPetLogById,
  updatePetLogById,
  deletePetLogById,
} = require('../controllers/petLogController');

// Define routes for Pet Logs
router.get('/allpetlogs', getAllPetLogs);
router.post('/create', createPetLog);
router.get('/searchpetlogsbypetid/', searchPetLogsByPetID);
router.get('/getpetlogbyid/:id', getPetLogById);
router.put('/update/:id', updatePetLogById);
router.delete('/delete/:id', deletePetLogById);

module.exports = router;