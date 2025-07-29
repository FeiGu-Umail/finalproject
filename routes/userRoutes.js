const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

// leaderboard

// add a new user with hashed password
router.post("/add", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      registration_date,
      age_group,
      level,
      avatar_url,
      group_id,
    } = req.body;

    // Check if email is already used
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      registration_date,
      age_group,
      level,
      avatar_url,
      group_id,
    });

    await newUser.save();
    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch the leaderboard, ordered by total_points
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ total_points: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. search user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 2. authenticate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3. Login successful
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      total_points: user.total_points,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user details by ID (for profile page)
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
