const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema({
    CompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
    PlanName: { type: String, required: true },
    AnnualDeductible: { type: Number, required: true },
    AnnualCoverage: { type: String, required: true },
    Reimbursement: { type: Number, required: true },
    CoveredItems: { type: String, required: true },
    NotCoveredItems: { type: String, required: true },
    InsurancePrice: { type: Number, required: true }
});

const InsurancePlan = mongoose.model('InsurancePlan', insurancePlanSchema);

module.exports = InsurancePlan;
