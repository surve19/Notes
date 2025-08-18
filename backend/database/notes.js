const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: ''
        },
        folderId: {
            type: mongoose.Schema.Types.ObjectId, ref: "foldermodels"
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

module.exports = mongoose.model("notesModel", notesSchema)