const mongoose = require('mongoose');

const insuranceCompanySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyLogo: { type: String, required: true },
    WebsiteUrl: { type: String, required: true }
});

const InsuranceCompany = mongoose.model('InsuranceCompany', insuranceCompanySchema);

module.exports = InsuranceCompany;
