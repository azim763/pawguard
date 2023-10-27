const mongoose = require('mongoose');

const insuranceCompanySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyLogo: { type: String, required: true },
    WebsiteUrl: { type: String, required: true },
    Recommend: {type: String, require:false, default:"  "},
    Highlights: {type: String, require:false, default:"  "},
});

const InsuranceCompany = mongoose.model('InsuranceCompany', insuranceCompanySchema);

module.exports = InsuranceCompany;
