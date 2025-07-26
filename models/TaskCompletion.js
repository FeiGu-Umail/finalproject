const mongoose = require("mongoose");

const taskCompletionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaskCompletion", taskCompletionSchema);
