const {
  getAllClinics,
  createClinic,
  searchClinicsBySpecies,
  getClinicById,
  updateClinicById,
  deleteClinicById,
} = require("../controllers/clinicController");

const router = require("express").Router();

router.get("/allclinics", getAllClinics);
router.post("/create", createClinic);
router.get("/searchclinicsbyspecies/:species", searchClinicsBySpecies);
router.get("/getclinicbyid/:id", getClinicById);
router.get("/update/:id", updateClinicById);
router.get("/delete/:id", deleteClinicById);
module.exports = router;
