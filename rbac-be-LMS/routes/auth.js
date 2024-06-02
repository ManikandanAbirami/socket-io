const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

// Create an api to register a user
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const userAlreadyExist = await User.findOne({ username });
    if (userAlreadyExist) {
      res.status(400).send("User name already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

// Create an api to login a user and return token
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password!");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token, role: user.role });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
