
const router = require("express").Router();
const {
  getAllPetLogs,
  createPetLog,
  getPetLogsByPetID,
  searchPetLogsByPetID,
  getPetLogById,
  updatePetLogById,
  deletePetLogById,
} = require('../controllers/petLogController');

// Define routes for Pet Logs
router.get('/allpetlogs', getAllPetLogs);
router.post('/create', createPetLog);
router.get('/searchpetlogsbypetid/:petID', searchPetLogsByPetID);
router.get('/getpetlogsbypetid', getPetLogsByPetID);
router.get('/getpetlogbyid/:id', getPetLogById);
router.put('/update/:id', updatePetLogById);
router.delete('/delete/:id', deletePetLogById);

module.exports = router;