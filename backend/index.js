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
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    app.listen(process.env.PORT, () => {
    console.log("App running");
    });
})
.catch((error) => {
    console.log(error)
});

app.use('/auth', authRouter);
app.use('/', folderRouter);
app.use('/notes', notesRouter);
app.use('/note/', contentRouter); 