// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// ------------------- SIGNUP -------------------
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
      tupId,
      email,
      firstName,
      lastName,
      birthday,
      password: hashed,
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        tupId: user.tupId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ------------------- GET PROFILE -------------------
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ------------------- UPDATE PROFILE -------------------
router.put(
  "/profile/update",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      console.log("🔹 Profile update request received");
      console.log("🔹 User ID from middleware:", req.user?.id);
      console.log("🔹 Request body:", req.body);
      console.log("🔹 File uploaded:", !!req.file);

      // ✅ Find user
      const user = await User.findById(req.user.id);
      if (!user) {
        console.error("❌ User not found:", req.user.id);
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      const { firstName, lastName, birthday } = req.body;

      // ✅ Handle avatar upload with buffer (memory storage)
      if (req.file && req.file.buffer) {
        console.log("🔹 Uploading new avatar to Cloudinary...");
        console.log("🔹 File details:", {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          bufferLength: req.file.buffer.length,
        });

        try {
          // Delete old avatar if exists
          if (user.avatar?.public_id) {
            console.log("🔹 Deleting old avatar:", user.avatar.public_id);
            try {
              await cloudinary.uploader.destroy(user.avatar.public_id);
              console.log("✅ Old avatar deleted");
            } catch (deleteError) {
              console.warn("⚠️ Failed to delete old avatar:", deleteError.message);
              // Continue with upload even if deletion fails
            }
          }

          // ✅ Upload new avatar from buffer using upload_stream
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "avatars",
                transformation: [
                  { width: 300, height: 300, crop: "fill", gravity: "face" },
                  { quality: "auto", fetch_format: "auto" },
                ],
                resource_type: "image"
              },
              (error, result) => {
                if (error) {
                  console.error("❌ Cloudinary upload error:", error);
                  reject(new Error("Failed to upload image: " + error.message));
                } else {
                  console.log("✅ Cloudinary upload success:", result.secure_url);
                  resolve(result);
                }
              }
            );

            // ✅ Stream the buffer to Cloudinary
            uploadStream.end(req.file.buffer);
          });

          user.avatar = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          };

          console.log("✅ Avatar uploaded successfully:", user.avatar.url);
        } catch (uploadError) {
          console.error("❌ Avatar upload failed:", uploadError);
          return res.status(500).json({
            success: false,
            msg: "Avatar upload failed: " + uploadError.message,
          });
        }
      }

      // ✅ Update only provided fields
      if (firstName?.trim()) user.firstName = firstName.trim();
      if (lastName?.trim()) user.lastName = lastName.trim();
      if (birthday) user.birthday = new Date(birthday);

      // ✅ Save changes to DB
      const savedUser = await user.save();
      console.log("✅ User saved successfully");

      // ✅ Generate a fresh JWT
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // ✅ Clean response object
      const userResponse = {
        id: savedUser._id,
        _id: savedUser._id, // Include both for compatibility
        tupId: savedUser.tupId,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        birthday: savedUser.birthday,
        avatar: savedUser.avatar || {}, // Ensure avatar is always an object
      };

      console.log("✅ Sending response:", {
        success: true,
        userId: userResponse.id,
        avatarUrl: userResponse.avatar?.url,
      });

      // ✅ Send response
      res.json({
        success: true,
        message: "Profile updated successfully",
        token,
        user: userResponse,
      });
    } catch (err) {
      console.error("❌ Profile update error:", err);
      res.status(500).json({
        success: false,
        msg: err.message || "Server error occurred",
      });
    }
  }
);

// ------------------- UPDATE PASSWORD -------------------
router.put("/profile/update-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
