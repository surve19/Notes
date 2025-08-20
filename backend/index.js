const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const folderModel = require('./database/folders'); 
const notesModel = require('./database/notes');
const folderRouter = require('./routes/folder');
const notesRouter = require('./routes/notes');
const contentRouter = require('./routes/content');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    app.listen(process.env.PORT, () => {
    console.log("App running");
    });
})
.catch((error) => {
    console.log(error)
});

// app.get("/", (req,res) => {
//     res.send("Running");
// });

app.use('/auth', authRouter);
app.use('/', folderRouter);
app.use('/notes', notesRouter);
app.use('/note/', contentRouter); 