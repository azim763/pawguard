const InsurancePlan = require("../models/insurancePlanModel");

module.exports.getAllInsurancePlans = async (req, res, next) => {
  try {
    const plans = await InsurancePlan.find();
    return res.json(plans);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createInsurancePlan = async (req, res, next) => {
  try {
    const planData = req.body;
    const plan = await InsurancePlan.create(planData);
    return res.json(plan);
  } catch (ex) {
    next(ex);
  }
};

// Search for insurance plans by company name
module.exports.searchInsurancePlansByCompany = async (req, res, next) => {
    try {
      const companyName = req.query.companyName;
      const plans = await InsurancePlan.find({ CompanyName: companyName });
      return res.json(plans);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read an insurance plan by its ID
module.exports.getInsurancePlanById = async (req, res, next) => {
    try {
      const planId = req.params.id;
      const plan = await InsurancePlan.findById(planId);
      if (!plan) {
        return res.status(404).json({ msg: 'Insurance plan not found' });
      }
      return res.json(plan);
    } catch (ex) {
      next(ex);
    }
  };

  // Update an insurance plan by its ID
module.exports.updateInsurancePlanById = async (req, res, next) => {
    try {
      const planId = req.params.id;
      const updatedPlanData = req.body;
      const updatedPlan = await InsurancePlan.findByIdAndUpdate(
        planId,
        updatedPlanData,
        { new: true }
      );
      if (!updatedPlan) {
        return res.status(404).json({ msg: 'Insurance plan not found' });
      }
      return res.json(updatedPlan);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete an insurance plan by its ID
module.exports.deleteInsurancePlanById = async (req, res, next) => {
    try {
      const planId = req.params.id;
      const deletedPlan = await InsurancePlan.findByIdAndRemove(planId);
      if (!deletedPlan) {
        return res.status(404).json({ msg: 'Insurance plan not found' });
      }
      return res.json({ msg: 'Insurance plan deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  