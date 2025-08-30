const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { tupId, email, firstName, lastName, birthday, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ $or: [{ email }, { tupId }] });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      tupId, email, firstName, lastName, birthday, password: hashed
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Log In
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: user._id,
        tupId: user.tupId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;
