const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const folderModel = require('./database/folders'); 
const notesModel = require('./database/notes');
const folderRouter = require('./routes/folder');
const notesRouter = require('./routes/notes');
const contentRouter = require('./routes/content');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000; 
const MONGODB_URI = "mongodb+srv://om21beceg088:om1234@cluster0.q7sfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
.then(async () => {
    app.listen(PORT, () => {
    console.log("App running");
    });
})
.catch((error) => {
    console.log(error)
});

// app.get("/", (req,res) => {
//     res.send("Running");
// });

app.use('/', folderRouter);
app.use('/notes', notesRouter);
app.use('/note/', contentRouter);