// utils/multer.js
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    console.log("🔹 File filter - mimetype:", file.mimetype);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      console.error("❌ Unsupported file type:", file.mimetype);
      return cb(new Error("Unsupported file type!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
