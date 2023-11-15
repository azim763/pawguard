const {
  getAllPets,
  createPet,
  searchPetsByUserID,
  getPetById,
  updatePetById,
  deletePetById,
  findByIdAndUpdateArchive,
  patchPetById
} = require("../controllers/petController");

const router = require("express").Router();

// Define routes for Pets
router.get("/allpets", getAllPets);
router.post("/create", createPet);
router.get("/searchpetsbyuserid", searchPetsByUserID);
router.get("/getpetbyid/:id", getPetById);
router.put("/update/:id", updatePetById);
router.patch("/patch/:id", patchPetById);
router.patch("/archive/:id", findByIdAndUpdateArchive);
router.delete("/delete/:id", deletePetById);

module.exports = router;
