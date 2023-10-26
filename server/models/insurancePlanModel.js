const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema({
    CompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceCompany', required: true },
    PlanName: { type: String, required: true },
    AnnualDeductible: { type: Number, required: true },
    AnnualCoverage: { type: String, required: true },
    Reimbursement: { type: Number, required: true },
    CoveredItems:  [{ type: String }],
    NotCoveredItems:  [{ type: String }],
    InsurancePrice: { type: Number, required: true },
    Recommend: {type: String, require:false},
    Highlights: {type: String, require:false},
    PetType: { type: String, required: true },
    PetAgeRange: { type: String, required: true },
});

// const InsurancePlan = mongoose.model('InsurancePlan', insurancePlanSchema);

// module.exports = InsurancePlan;

module.exports = mongoose.model("InsurancePlans", insurancePlanSchema);