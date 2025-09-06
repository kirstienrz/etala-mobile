const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ Gemini AI SDK
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Chatbot Route
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 📝 Enhanced instruction with hotlines
    const instruction = `
      You are a Philippine-focused chatbot.
      You should always answer based on the context of the Philippines.

      You specialize in:
      - Gender and Development (GAD) in the Philippines
      - Philippine gender equality and human rights laws 
        (e.g. Magna Carta of Women, Anti-Violence Against Women and Children Act, 
        Safe Spaces Act, Anti-Sexual Harassment Act, Anti-Bullying Act, etc.)
      - Local government initiatives, programs, and policies
      - Philippine Constitution and related rights
      - Practical help on where to report harassment, bullying, abuse, or violence

      Rules for answering:
      - If the user asks about harassment, discrimination, bullying, abuse, or domestic problems 
        (like being hurt by spouse, parents, or family members):
        1. Explain which Philippine law applies to protect them.
        2. Give step-by-step guidance on how to report:
           • Barangay Hall (Barangay VAW Desk / Barangay Protection Order)
           • Nearest Police Station or PNP Women and Children Protection Desk (WCPD)
           • DSWD offices for social services
           • Commission on Human Rights (CHR)
        3. Always include these official hotlines:
           - PNP Women and Children Protection Center: (02) 8532-6690 / 8535-3279
           - DSWD Hotline: 8-931-8101
           - DSWD Crisis Intervention: 1343
           - Philippine Commission on Women (PCW): (02) 8735-1654
           - CHR Hotline: 1342
        4. If the situation is urgent, remind the user to call 911 immediately.

      - Always give answers in the Philippine legal and cultural context.
      - If the question is clearly unrelated to the Philippines or gender issues,
        politely say: "I can only answer questions related to Gender and Development and laws in the Philippines."
    `;

    const result = await model.generateContent(`${instruction}\nUser: ${message}`);
    const reply = result.response.text().replace(/\*\*/g, "");
    res.json({ reply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini" });
  }
});



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
