const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    title : 
        {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("folderModel", folderSchema);