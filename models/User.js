// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
  age_group: { type: String },
  total_points: { type: Number, default: 0 },
  level: { type: String },
  avatar_url: { type: String },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityGroup" }, // if u r gonna create COMMUNITY_GROUP table
});

module.exports = mongoose.model("User", userSchema);
