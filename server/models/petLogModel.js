const mongoose = require('mongoose');

const petLogSchema = new mongoose.Schema({
    PetID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    LogDate: { type: Date, required: true },
    Weight: { type: Number, required: true },
    ActivityLevel: { type: String, required: true },
    UrineAmount: { type: String, required: true },
    StoolAmount: { type: String, required: true },
    StoolAppearance: { type: String, required: true },
    PetImages: [{ type: String }],
    Notes: { type: String, required: true }
});

const PetLog = mongoose.model('PetLog', petLogSchema);

module.exports = PetLog;
