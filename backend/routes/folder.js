const express = require("express");
const router = express.Router();
const folder = require('../database/folders');
// const {authenticateToken} = require('../middleware');

router.get('/',  async(req, res) => {
    try {
        const folders = await folder.find({isDeleted: false});
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:folderId', async (req, res) => {
  try {
    const folderDetails = await folder.find({
      _id: req.params.folderId,
      isDeleted: false
    });
    res.status(200).json(folderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async(req, res) => {
    try {
        const folders = new folder({
            title: req.body.title
        });
        await folders.save();
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const updatedFolders = await folder.findByIdAndUpdate(
            req.params.id,
            {title: req.body.title}
        )
        res.status(200).json(updatedFolders);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const deletedFolders = await folder.findByIdAndUpdate(
            req.params.id,
            {isDeleted: true}
        )
        res.status(200).json(deletedFolders);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router