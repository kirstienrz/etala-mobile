const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();

// ====== Middleware ======
app.use(cors({
  origin: "*", // Allow all origins while testing
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Parse JSON requests
app.use(express.json());

// ====== Debugging Env Variables ======
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "✅" : "❌ MISSING");
console.log("Mongo URI loaded:", process.env.MONGO_URI ? "✅" : "❌ MISSING");

// ====== Cloudinary Config ======
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ====== API Routes ======
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); // Example: PUT /api/auth/profile/update

// ====== Gemini Chatbot ======
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const instruction = `
      You are a Philippine-focused chatbot.
      Answer ONLY based on Philippine context, especially Gender and Development (GAD),
      local laws, and hotlines for harassment, abuse, and domestic violence.

      Always include these emergency hotlines:
      - PNP Women & Children Protection: (02) 8532-6690 / 8535-3279
      - DSWD Hotline: 8-931-8101
      - DSWD Crisis Intervention: 1343
      - Philippine Commission on Women: (02) 8735-1654
      - CHR Hotline: 1342
      - Emergency: 911
    `;

    const result = await model.generateContent(`${instruction}\nUser: ${message}`);
    const reply = result.response.text().replace(/\*\*/g, "");
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini" });
  }
});

// ====== MongoDB Connection ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected 🚀"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
