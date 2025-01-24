const router = require("express").Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/verifyToken");

router.get("/tasks", verifyToken, taskController.getTask);
router.put("/:taskId", taskController.updateTask);
router.post("/tasks", verifyToken, taskController.createTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
