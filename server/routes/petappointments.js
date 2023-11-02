
const router = require("express").Router();

const {
  getAllPetAppointments,
  createPetAppointment,
  searchPetAppointmentsByPetID,
  getPetAppointmentById,
  updatePetAppointmentById,
  deletePetAppointmentById,
} = require('../controllers/petAppointmentController');

// Define routes for Pet Appointments
router.get('/allpetappointments', getAllPetAppointments);
router.post('/create', createPetAppointment);
router.get('/searchpetappointmentsbypetid', searchPetAppointmentsByPetID);
router.get('/searchpetappointmentsbyuserid', searchPetAppointmentsByUserID);
router.get('/getpetappointmentbyid/:id', getPetAppointmentById);
router.put('/update/:id', updatePetAppointmentById);
router.delete('/delete/:id', deletePetAppointmentById);

module.exports = router;

