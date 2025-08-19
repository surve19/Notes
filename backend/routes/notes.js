const express = require("express");
const router = express.Router();
const folder = require('../database/folders');
const notes = require('../database/notes');

router.get('/:folderId', async (req, res) => {
  try {
    const allNotes = await notes.find({
      folderId: req.params.folderId,
      isDeleted: false
    });
    res.status(200).json(allNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/:folderId/newnote', async(req, res) => {
    try {
      console.log("newnote")
        const Id = await folder.findById(req.body.folderId);
        const note = new notes({
            title: req.body.title,
            content: req.body.content,
            folderId: Id
        });
        await note.save();
        res.status(200).json(notes);
        console.log("folderId",req.body.folderId)
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const deletedNotes = await notes.findByIdAndUpdate(
            req.params.id,
            {isDeleted: true}
        )
        res.status(200).json(deletedNotes);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router