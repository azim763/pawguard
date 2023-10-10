const InsuranceCompany = require("../models/insuranceCompanyModel");

module.exports.getAllInsuranceCompanies = async (req, res, next) => {
  try {
    const companies = await InsuranceCompany.find();
    return res.json(companies);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createInsuranceCompany = async (req, res, next) => {
  try {
    const companyData = req.body;
    const company = await InsuranceCompany.create(companyData);
    return res.json(company);
  } catch (ex) {
    next(ex);
  }
};

// Read an insurance company by its ID
module.exports.getInsuranceCompanyById = async (req, res, next) => {
    try {
      const companyId = req.params.id;
      const company = await InsuranceCompany.findById(companyId);
      if (!company) {
        return res.status(404).json({ msg: 'Insurance company not found' });
      }
      return res.json(company);
    } catch (ex) {
      next(ex);
    }
  };

  // Update an insurance company by its ID
module.exports.updateInsuranceCompanyById = async (req, res, next) => {
    try {
      const companyId = req.params.id;
      const updatedCompanyData = req.body;
      const updatedCompany = await InsuranceCompany.findByIdAndUpdate(
        companyId,
        updatedCompanyData,
        { new: true }
      );
      if (!updatedCompany) {
        return res.status(404).json({ msg: 'Insurance company not found' });
      }
      return res.json(updatedCompany);
    } catch (ex) {
      next(ex);
    }
  };
  

  // Delete an insurance company by its ID
module.exports.deleteInsuranceCompanyById = async (req, res, next) => {
    try {
      const companyId = req.params.id;
      const deletedCompany = await InsuranceCompany.findByIdAndRemove(companyId);
      if (!deletedCompany) {
        return res.status(404).json({ msg: 'Insurance company not found' });
      }
      return res.json({ msg: 'Insurance company deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  