const PetLog = require("../models/petLogModel");
const { ObjectId } = require('mongoose').Types;



module.exports.getAllPetLogs = async (req, res, next) => {
  try {
    const logs = await PetLog.find();
    return res.json(logs);
  } catch (ex) {
    next(ex);
  }
};

module.exports.createPetLog = async (req, res, next) => {
  try {
    const logData = req.body;
    logData.timestamp = new Date();
    const log = await PetLog.create(logData);
    return res.json(log);
  } catch (ex) {
    next(ex);
  }
};

// Search for pet logs by PetID
module.exports.searchPetLogsByPetID = async (req, res, next) => {
    try {
      const petID = req.query.PetID;
      const logs = await PetLog.find({ PetID: petID });
      return res.json(logs);
    } catch (ex) {
      next(ex);
    }
  };
  
  // Read a pet log entry by its ID
module.exports.getPetLogById = async (req, res, next) => {
    try {
      const logId = req.params.id;
      const log = await PetLog.findById(logId);
      if (!log) {
        return res.status(404).json({ msg: 'Pet log entry not found' });
      }
      return res.json(log);
    } catch (ex) {
      next(ex);
    }
  };

  // Update a pet log entry by its ID
module.exports.updatePetLogById = async (req, res, next) => {
    try {
      const logId = req.params.id;
      const updatedLogData = req.body;
      const updatedLog = await PetLog.findByIdAndUpdate(
        logId,
        updatedLogData,
        { new: true }
      );
      if (!updatedLog) {
        return res.status(404).json({ msg: 'Pet log entry not found' });
      }
      return res.json(updatedLog);
    } catch (ex) {
      next(ex);
    }
  };

  // Delete a pet log entry by its ID
module.exports.deletePetLogById = async (req, res, next) => {
    try {
      const logId = new ObjectId(req.params.id);
      const deletedLog = await PetLog.findByIdAndRemove(logId);
      if (!deletedLog) {
        return res.status(404).json({ msg: 'Pet log entry not found' });
      }
      return res.json({ msg: 'Pet log entry deleted successfully' });
    } catch (ex) {
      next(ex);
    }
  };
  