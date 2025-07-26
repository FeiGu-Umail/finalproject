// One-time script to backfill missing 'point' field in tasks
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("../models/Tasks");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // find the tasks without points
    const tasksToUpdate = await Task.find({ point: { $exists: false } });

    console.log(`Found ${tasksToUpdate.length} tasks without points.`);

    for (const task of tasksToUpdate) {
      task.point = 10; // adding default val
      await task.save();
      console.log(`Updated task ${task._id} with default point 10`);
    }

    console.log("All tasks updated.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
