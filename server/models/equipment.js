const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EquipmentSchema = new Schema({
    equipName: {
        type: String,
        required:true
    },
    equipID: {
        type: String,
        required:true
    },
    quan: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);