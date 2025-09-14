const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  tupId: { type: String, required: true, unique: true }, // ex: TUPT-22-0711
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  password: { type: String, required: true }, // hashed
  avatar: {
      public_id: { type: String },
      url: { type: String },
    },
});

module.exports = mongoose.model("User", UserSchema);
