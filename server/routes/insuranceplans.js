
const {
  getAllInsurancePlans,
  createInsurancePlan,
  searchInsurancePlansByCompany,
  getInsurancePlanById,
  updateInsurancePlanById,
  deleteInsurancePlanById,
} = require('../controllers/insurancePlanController');

const router = require("express").Router();

// Define routes for Insurance Plans
router.get('/allinsuranceplans', getAllInsurancePlans);
router.post('/create', createInsurancePlan);
router.get('/searchplansbycompany', searchInsurancePlansByCompany);
router.get('/getinsuranceplanbyid/:id', getInsurancePlanById);
router.put('/update/:id', updateInsurancePlanById);
router.delete('/delete/:id', deleteInsurancePlanById);

module.exports = router;