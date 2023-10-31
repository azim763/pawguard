const {
  getAllInsuranceCompanies,
  createInsuranceCompany,
  getInsuranceCompanyById,
  updateInsuranceCompanyById,
  deleteInsuranceCompanyById,
} = require("../controllers/insuranceCompanyController");

const router = require("express").Router();

router.post("/allinsurancecompanies", getAllInsuranceCompanies);
router.post("/create", createInsuranceCompany);
router.get("/getinsurancecompanybyid/:id", getInsuranceCompanyById);
router.get("/update/:id", updateInsuranceCompanyById);
router.get("/delete/:id", deleteInsuranceCompanyById);
module.exports = router;
