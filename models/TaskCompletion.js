const mongoose = require("mongoose");

const taskCompletionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("TaskCompletion", taskCompletionSchema);
