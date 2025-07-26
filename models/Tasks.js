const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // FK
  taskType: { type: String, required: true }, // e.g. "Bicycle to work"
  carbonSaving: { type: Number, default: 0 }, // e.g. 1.5 kg CO2
  submissionTime: { type: Date, default: Date.now },
  taskStatus: { type: String, default: "Pending" }, // "Pending", "Completed"
  taskPictureUrl: { type: String }, // upload pic URL
  point: { type: Number, default: 0 },
});

module.exports = mongoose.model("Task", taskSchema);
