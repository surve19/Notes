const express = require("express");
const router = express.Router();
const folder = require('../database/folders');
const notes = require('../database/notes');
const { authenticateToken } = require("../middleware");

router.get('/:id', async (req, res) => {
    try {
        const note = await notes.findById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const Id = await notes.findById(req.params.id);
        if (Id) {
            const note = await notes.findByIdAndUpdate(
                Id,
                {
                    title: req.body.title,
                    content: req.body.content
                }
            )
            console.log(req.body.content)
        } else {
            console.log("Note not found");
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
});

module.exports = router