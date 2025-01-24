const User = require("../models/userSchema");
const Task = require("../models/taskSchema");

exports.getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    if (!tasks) return res.status(404).json({ message: "No tasks found" });

    res.status(200).json({
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { desc } = req.body;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.desc = desc;
    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json({
      message: "task updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "failed update task",
      error: err.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, desc } = req.body;

    const newTask = new Task({
      userId,
      title,
      desc,
      createdAt: Date.now(),
    });

    await newTask.save();

    res.status(200).json({
      message: "Task created",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed create task",
      error: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      message: `Task ${taskId} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to delete task`,
      error: err.message,
    });
  }
};
