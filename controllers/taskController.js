// controllers/taskController.js
const TaskCompletion = require("../models/TaskCompletion");
const User = require("../models/User");
const Task = require("../models/Tasks");

const completeTask = async (req, res) => {
  const { userId, taskId } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // 1. Save task completion
    await TaskCompletion.create({
      userId,
      taskId,
      date: new Date(),
    });

    // 2. Add task points to user
    await User.findByIdAndUpdate(userId, {
      $inc: { total_points: task.points },
    });

    res.status(200).json({ message: "Task completed and points added." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  completeTask,
};
