const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");
const TaskCompletion = require("../models/TaskCompletion");
const User = require("../models/User");

// Add a new task
router.post("/add", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all available tasks (for displaying "Today’s Tasks" on the frontend)
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark a task as completed by the user → Save the record + Add points
router.post("/complete", async (req, res) => {
  const { userId, taskId } = req.body;

  try {
    const today = new Date().toISOString().split("T")[0]; // 格式: "2025-07-24"

    // Check if the task has already been completed today
    const already = await TaskCompletion.findOne({
      userId,
      taskId,
      date: today,
    });
    if (already) {
      return res.status(400).json({ message: "Task already completed today." });
    }

    // Save task completion record
    const newCompletion = new TaskCompletion({ userId, taskId, date: today });
    await newCompletion.save();

    // Retrieve task info to get point value
    const task = await Task.findById(taskId);
    const points = typeof task.point === "number" ? task.point : 10;

    // Add points to the user's total
    await User.findByIdAndUpdate(userId, { $inc: { total_points: points } });

    res
      .status(200)
      .json({ message: "Task marked as done", pointsEarned: points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all completed tasks for a user (for the Action Page)
router.get("/completed/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const completions = await TaskCompletion.find({ userId })
      .populate("taskId") // fetch task info
      .sort({ date: -1 }); // In descending order of completion time

    const result = completions.map((entry) => ({
      taskType: entry.taskId.taskType,
      carbonSaving: entry.taskId.carbonSaving,
      date: entry.date,
      pictureUrl: entry.taskId.taskPictureUrl,
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
