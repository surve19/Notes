const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../database/user');
const bcrypt = require("bcrypt");
require('dotenv').config();


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 8)
      return res
        .status(400)
        .send(
          "Password is required and should be min 6 characters long"
        );
    let userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send("Email is taken");
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 8)
      return res
        .status(400)
        .send(
          "Password is required and should be min 8 characters long"
        );
    let userExist = await User.findOne({ email });
    if (!userExist) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRETKEY, { expiresIn: "1h" });

    res.cookie("uid",token, {
      httpOnly: true
    });

    return res.json({ id: userExist._id, email: userExist.email });
  }
  catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
})

module.exports = router;