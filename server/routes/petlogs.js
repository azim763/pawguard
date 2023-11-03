
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
<<<<<<< HEAD
router.get('/searchpetlogsbypetid/:petID', searchPetLogsByPetID);
router.get('/getpetlogsbypetid', getPetLogsByPetID);
=======
router.get('/searchpetlogsbypetid/', searchPetLogsByPetID);
>>>>>>> 7899d51eb3c20541e224db5809e0337a5c1d941f
router.get('/getpetlogbyid/:id', getPetLogById);
router.put('/update/:id', updatePetLogById);
router.delete('/delete/:id', deletePetLogById);

module.exports = router;